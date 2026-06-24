import { useState, useEffect, useRef, Fragment } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPermitDetail, fetchPermits } from '../services/permits';
import type { ApiPermitDetail } from '../services/permits';
import { apiFetch, fetchObraActivitySummary, fetchDocumentos, triggerDocumentExtraction, saveDocumentos, sendNotificationEmail, validateDocumentQuality, listObraDocuments, analyzeObraDocument, uploadObraDocument, obraDocumentDownloadUrl, deleteObraDocument, createDocumento, updateDocumento, deleteDocumento } from '../services/api';
import type { ObraActivitySummary, Documento, DocAnalysisResult, QualityVerdict, ObraDocumento, ObraUploadResult, ObraAnalyzeResult } from '../services/api';
import type { PermitTramitacion, PermitEstado, MilestoneDates } from '../types/permit';

// ─── Milestone status helpers ─────────────────────────────────────────────────

const MONTHS_MAP: Record<string, number> = {
    Jan:0, Feb:1, Mar:2, Apr:3, May:4, Jun:5, Jul:6, Aug:7, Sep:8, Oct:9, Nov:10, Dec:11,
};

function parseDisplayDate(s: string | null): Date | null {
    if (!s) return null;
    const parts = s.split('/');
    if (parts.length !== 3) return null;
    const [dd, mon, yy] = parts;
    const m = MONTHS_MAP[mon];
    if (m === undefined) return null;
    return new Date(2000 + parseInt(yy), m, parseInt(dd));
}

type MilestoneStatus = 'cumplido' | 'atrasado' | 'en-proceso' | 'pendiente';

function getMilestoneStatus(ms: MilestoneDates, today: Date): MilestoneStatus {
    const actual   = parseDisplayDate(ms.actual);
    const forecast = parseDisplayDate(ms.forecast);
    const plan     = parseDisplayDate(ms.plan);
    if (actual) return plan && actual > plan ? 'atrasado' : 'cumplido';
    const ref = forecast ?? plan;
    if (!ref) return 'pendiente';
    if (ref < today) return 'atrasado';
    if (plan && plan <= today) return 'en-proceso';
    return 'pendiente';
}

const STATUS_CONFIG: Record<MilestoneStatus, { icon: string; labelColor: string; dateColor: string; dashed?: boolean }> = {
    cumplido:     { icon: 'check_circle', labelColor: 'text-green-500',          dateColor: 'text-green-400' },
    atrasado:     { icon: 'error',        labelColor: 'text-red-500',            dateColor: 'text-red-400'   },
    'en-proceso': { icon: 'schedule',     labelColor: 'text-amber-500',          dateColor: 'text-amber-400' },
    pendiente:    { icon: '',             labelColor: 'text-text-secondary',      dateColor: 'text-text-secondary/70', dashed: true },
};

const estadoStyles: Record<PermitEstado, string> = {
    'NO INICIADO':   'bg-slate-500/10 text-slate-400 border-slate-500/30',
    'EN ELABORACIÓN':'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
    'EN REVISIÓN':   'bg-blue-500/10 text-blue-400 border-blue-500/30',
    'APROBADO':      'bg-green-500/10 text-green-400 border-green-500/30',
    'RECHAZADO':     'bg-red-500/10 text-red-400 border-red-500/30',
};

const MILESTONE_DEFS: { key: keyof PermitTramitacion; label: string; tooltip: string }[] = [
    { key: 'solicitudInfoLegal',   label: 'Solicitud de Información Legal e Ingeniería',            tooltip: 'Recopilación de todos los antecedentes legales y técnicos necesarios de las áreas de la compañía.' },
    { key: 'entregaInformacion',   label: 'Entrega de Información Legal e Ingeniería',              tooltip: 'Recepción conforme de todos los antecedentes solicitados a las áreas internas.' },
    { key: 'inicioElaboracion',    label: 'Inicio Elaboración de Expediente por Contratista',       tooltip: 'El equipo consultor comienza la redacción del expediente con la información base.' },
    { key: 'terminoElaboracion',   label: 'Borrador del Expediente (Rev. B)',                       tooltip: 'Hito que marca la entrega del primer borrador completo (Revisión B) por parte del consultor.' },
    { key: 'inicioRevisionGF',     label: 'Inicio Revisión Gold Fields / Asesor de Permiso / Ingeniero de Construcción',  tooltip: 'Periodo donde Gold Fields y/o el Asesor de Permiso e Ingeniero de Construcción revisan el borrador.' },
    { key: 'terminoRevisionGF',    label: 'Término Revisión Gold Fields / Asesor de Permiso / Ingeniero de Construcción', tooltip: 'Cierre del periodo de revisión, con la consolidación y envío de observaciones al consultor.' },
    { key: 'inicioCorreccionObs',  label: 'Inicio Corrección de Observaciones del Contratista',    tooltip: 'El equipo consultor comienza a levantar e integrar las observaciones indicadas por el cliente.' },
    { key: 'terminoCorreccionObs', label: 'Término Corrección de Observaciones del Contratista',   tooltip: 'Hito final de levantamiento de observaciones y entrega del informe para Revisión 0.' },
    { key: 'inicioRevision0',      label: 'Inicio Proceso Firma Representante Legal',               tooltip: 'El documento es enviado al Representante Legal para su revisión y firma.' },
    { key: 'terminoRevision0',     label: 'Término Proceso Firma Representante Legal',              tooltip: 'Documento firmado por el Representante Legal y listo para ingresar a la autoridad.' },
    { key: 'ingresoAutoridad',     label: 'Ingreso a la Autoridad',                                 tooltip: 'Presentación formal del expediente ante el organismo regulador competente.' },
    { key: 'firmaRL',              label: 'Firma del Representante Legal',                          tooltip: 'Firma del Representante Legal del titular del proyecto ante la autoridad.' },
    { key: 'fechaResolucion',      label: 'Fecha de Resolución de la Autoridad',                   tooltip: 'Fecha en que la autoridad emite la resolución de aprobación o rechazo del permiso.' },
    { key: 'aprobacion',           label: 'Aprobación del Permiso',                                tooltip: 'Permiso aprobado formalmente por la autoridad competente.' },
];

// Maps MILESTONE_DEFS key → backend milestone_order for document filtering
const MILESTONE_ORDER_MAP: Record<string, number> = {
    solicitudInfoLegal: 1,
    entregaInformacion: 3,
    inicioElaboracion: 5,
    terminoElaboracion: 6,
    inicioRevisionGF: 7,
    terminoRevisionGF: 8,
    inicioCorreccionObs: 9,
    terminoCorreccionObs: 10,
    inicioRevision0: 11,
    terminoRevision0: 12,
    ingresoAutoridad: 13,
    firmaRL: 0,
    fechaResolucion: 0,
    aprobacion: 15,
};

const ProjectDashboard = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [permit, setPermit] = useState<PermitTramitacion | null>(null);
    const [obraSummary, setObraSummary] = useState<ObraActivitySummary | null>(null);
    const [loading, setLoading] = useState(true);

    // RCA Modal state
    const [showRCAModal, setShowRCAModal] = useState(false);

    // Other modals state
    const [showDownloads, setShowDownloads] = useState(false);
    // Centro de documentos de la obra (subida + validación IA + R2)
    const [obraDocs, setObraDocs] = useState<ObraDocumento[]>([]);
    const [obraDocsLoading, setObraDocsLoading] = useState(false);
    const [uploadFile, setUploadFile] = useState<File | null>(null);
    const [uploadCategoria, setUploadCategoria] = useState('OTRO');
    const [uploadStep, setUploadStep] = useState<'idle' | 'analyzing' | 'analyzed' | 'uploading' | 'result'>('idle');
    const [uploadResult, setUploadResult] = useState<ObraUploadResult | null>(null);
    const [analyzeResult, setAnalyzeResult] = useState<ObraAnalyzeResult | null>(null);
    const [showNotifications, setShowNotifications] = useState(false);
    const [notifEmail, setNotifEmail] = useState('');
    const [notifAlertasVenc, setNotifAlertasVenc] = useState(true);
    const [notifCambiosEstado, setNotifCambiosEstado] = useState(true);
    const [notifResumenSemanal, setNotifResumenSemanal] = useState(false);
    const [notifSending, setNotifSending] = useState(false);
    const [notifMsg, setNotifMsg] = useState<{ ok: boolean; text: string } | null>(null);

    // Milestone expansion
    const [expandedMilestoneIdx, setExpandedMilestoneIdx] = useState<number | null>(null);
    // Alta de documento requerido por hito
    const [addDocMilestone, setAddDocMilestone] = useState<number | null>(null);
    const emptyNewDoc = { nombre_documento: '', nombre_responsable: '', correo_responsable: '', fecha_entrega: '' };
    const [newDoc, setNewDoc] = useState(emptyNewDoc);
    const [savingDoc, setSavingDoc] = useState(false);
    const [docActionId, setDocActionId] = useState<number | null>(null);

    // Documents state
    const [documents, setDocuments] = useState<Documento[]>([]);
    const [docFile, setDocFile] = useState<File | null>(null);
    const [docStep, setDocStep] = useState<'upload' | 'analyzing' | 'review' | 'saving' | 'done' | 'validating' | 'verdict'>('upload');
    const [docAnalysis, setDocAnalysis] = useState<DocAnalysisResult | null>(null);
    const [docTargetPermitId, setDocTargetPermitId] = useState<number | null>(null);
    const [docSaveMsg, setDocSaveMsg] = useState<string | null>(null);

    // Quality validation (sub-producto 2 — agente de calidad documental con RAG)
    const [qualityVerdict, setQualityVerdict] = useState<QualityVerdict | null>(null);
    const [validateTargetDocId, setValidateTargetDocId] = useState<number | null>(null);

    // Permit selector state
    const [siblingPermits, setSiblingPermits] = useState<PermitTramitacion[]>([]);
    const [selectedCode, setSelectedCode] = useState<string>('');
    const [loadingSwitch, setLoadingSwitch] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const permitDropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!id) return;
        const decoded = decodeURIComponent(id);
        setSelectedCode(decoded);

        fetchPermitDetail(decoded)
            .then(async (p) => {
                setPermit(p);
                const raw = await apiFetch<ApiPermitDetail>(`/permits/${encodeURIComponent(decoded)}`);
                const fetches: Promise<void>[] = [];
                if (raw.obra_actividad) {
                    fetches.push(
                        fetchObraActivitySummary(raw.obra_actividad).then(setObraSummary)
                    );
                    fetches.push(
                        fetchPermits().then(all => {
                            setSiblingPermits(all.filter(s => s.obraActividad === raw.obra_actividad));
                        })
                    );
                }
                if (p.id) {
                    fetches.push(
                        fetchDocumentos(p.id).then(setDocuments)
                    );
                }
                await Promise.all(fetches);
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [id]);

    const handlePermitSwitch = async (code: string) => {
        if (code === selectedCode) return;
        setSelectedCode(code);
        setLoadingSwitch(true);
        try {
            const newPermit = await fetchPermitDetail(code);
            setPermit(newPermit);
        } catch (e) {
            console.error(e);
        } finally {
            setLoadingSwitch(false);
        }
    };

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (permitDropdownRef.current && !permitDropdownRef.current.contains(e.target as Node)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);


    const handleAnalyzeDocs = async () => {
        if (!docFile || !permit) return;
        setDocStep('analyzing');
        setDocAnalysis(null);
        setDocSaveMsg(null);
        try {
            const result = await triggerDocumentExtraction(
                docFile,
                permit.tipoPermiso,
                permit.autoridad,
                permit.gerencia ?? '',
                permit.codigoAconex,
                siblingPermits.map(p => p.codigoAconex),
            );
            setDocAnalysis(result);
            // Pre-select permit: if agent detected current permit, use it; else suggest current
            const detectedCurrent = result.detected_permits.includes(permit.codigoAconex);
            setDocTargetPermitId(detectedCurrent || result.detected_permits.length === 0 ? permit.id : null);
            setDocStep('review');
        } catch (e: unknown) {
            setDocAnalysis({ status: 'blank', detected_permits: [], warnings: [`Error: ${e instanceof Error ? e.message : String(e)}`], documentos: [] });
            setDocStep('review');
        }
    };

    const handleSaveDocs = async () => {
        if (!docAnalysis || !docTargetPermitId) return;
        setDocStep('saving');
        try {
            const { guardados, errores } = await saveDocumentos(docAnalysis.documentos, docTargetPermitId);
            setDocSaveMsg(`✓ ${guardados} documentos guardados correctamente.${errores.length ? ' Errores: ' + errores.join(', ') : ''}`);
            const updated = await fetchDocumentos(permit!.id);
            setDocuments(updated);
            setDocStep('done');
        } catch (e: unknown) {
            setDocSaveMsg(`Error al guardar: ${e instanceof Error ? e.message : String(e)}`);
            setDocStep('review');
        }
    };

    const handleValidateQuality = async () => {
        if (!docFile || !permit) return;
        if (permit.wbsId == null) {
            setQualityVerdict({ veredicto: 'INDETERMINADO', observaciones: 'Este permiso no tiene un WBS asociado, así que no hay RCA indexada contra la cual validar.' });
            setDocStep('verdict');
            return;
        }
        setDocStep('validating');
        setQualityVerdict(null);
        try {
            const verdict = await validateDocumentQuality(
                docFile,
                permit.wbsId,
                validateTargetDocId ?? undefined,
            );
            setQualityVerdict(verdict);
            setDocStep('verdict');
        } catch (e: unknown) {
            setQualityVerdict({ veredicto: 'INDETERMINADO', observaciones: `Error al validar: ${e instanceof Error ? e.message : String(e)}` });
            setDocStep('verdict');
        }
    };

    const resetDocModal = () => {
        setDocFile(null);
        setDocStep('upload');
        setDocAnalysis(null);
        setDocTargetPermitId(null);
        setDocSaveMsg(null);
        setQualityVerdict(null);
        setValidateTargetDocId(null);
    };

    // Cargar documentos de la obra al abrir el centro de documentos
    useEffect(() => {
        if (!showDownloads || !permit?.id) return;
        setObraDocsLoading(true);
        listObraDocuments(permit.id)
            .then(setObraDocs)
            .catch(() => setObraDocs([]))
            .finally(() => setObraDocsLoading(false));
    }, [showDownloads, permit?.id]);

    const handleAnalyzeObraDoc = async () => {
        if (!uploadFile || !permit?.id) return;
        setUploadStep('analyzing');
        setAnalyzeResult(null);
        try {
            const result = await analyzeObraDocument(uploadFile, permit.id);
            setAnalyzeResult(result);
            setUploadStep('analyzed');
        } catch (e: unknown) {
            setAnalyzeResult({ resultado: 'DUDOSA', mensaje: e instanceof Error ? e.message : String(e), como_solucionar: '' });
            setUploadStep('analyzed');
        }
    };

    const handleUploadObraDoc = async () => {
        if (!uploadFile || !permit?.id) return;
        setUploadStep('uploading');
        setUploadResult(null);
        try {
            const result = await uploadObraDocument(uploadFile, permit.id, uploadCategoria);
            setUploadResult(result);
            setUploadStep('result');
            if (result.aprobado) {
                const updated = await listObraDocuments(permit.id);
                setObraDocs(updated);
            }
        } catch (e: unknown) {
            setUploadResult({ aprobado: false, veredicto: 'ERROR', observaciones: e instanceof Error ? e.message : String(e) });
            setUploadStep('result');
        }
    };

    const resetUpload = () => {
        setUploadFile(null);
        setUploadCategoria('OTRO');
        setUploadStep('idle');
        setUploadResult(null);
        setAnalyzeResult(null);
    };

    const handleDeleteObraDoc = async (docId: number) => {
        try {
            await deleteObraDocument(docId);
            setObraDocs(prev => prev.filter(d => d.id !== docId));
        } catch (e) {
            console.error('Error al eliminar documento', e);
        }
    };

    const refreshDocs = async () => {
        if (!permit?.id) return;
        const updated = await fetchDocumentos(permit.id);
        setDocuments(updated);
    };

    const handleAddDoc = async (milestoneOrder: number) => {
        if (!permit?.id || !newDoc.nombre_documento.trim()) return;
        setSavingDoc(true);
        try {
            await createDocumento({
                permit_id: permit.id,
                milestone_order: milestoneOrder,
                nombre_documento: newDoc.nombre_documento.trim(),
                nombre_responsable: newDoc.nombre_responsable.trim() || null,
                correo_responsable: newDoc.correo_responsable.trim() || null,
                fecha_entrega: newDoc.fecha_entrega || null,
            });
            await refreshDocs();
            setNewDoc(emptyNewDoc);
            setAddDocMilestone(null);
        } catch (e) {
            console.error('Error al añadir documento', e);
        } finally {
            setSavingDoc(false);
        }
    };

    const handleToggleDelivered = async (docId: number, entregado: boolean) => {
        setDocActionId(docId);
        try {
            // Al marcar entregado: subido=true y se limpia el atraso. Al desmarcar: vuelve a pendiente.
            await updateDocumento(docId, entregado ? { subido: true, dias_atraso: 0 } : { subido: false });
            await refreshDocs();
        } catch (e) {
            console.error('Error al actualizar documento', e);
        } finally {
            setDocActionId(null);
        }
    };

    const handleDeleteDoc = async (docId: number) => {
        setDocActionId(docId);
        try {
            await deleteDocumento(docId);
            await refreshDocs();
        } catch (e) {
            console.error('Error al eliminar documento', e);
        } finally {
            setDocActionId(null);
        }
    };

    const projectName = permit?.obraActividad ?? 'Cargando...';


    // RCA donut data
    const rcaTotal      = obraSummary?.rca.total      ?? 0;
    const rcaCumplidos  = obraSummary?.rca.cumplidos  ?? 0;
    const rcaEnProceso  = obraSummary?.rca.en_proceso ?? 0;
    const rcaRechazados = obraSummary?.rca.rechazados ?? 0;

    // GDC donut data
    const gdcTotal      = obraSummary?.gdc.total      ?? 0;
    const gdcCumplidos  = obraSummary?.gdc.cumplidos  ?? 0;
    const gdcEnProceso  = obraSummary?.gdc.en_proceso ?? 0;
    const gdcRechazados = obraSummary?.gdc.rechazados ?? 0;

    // Total donut data
    const totalPermisos  = obraSummary?.total.total      ?? 0;
    const totalCumplidos = obraSummary?.total.cumplidos  ?? 0;
    const totalEnProceso = obraSummary?.total.en_proceso ?? 0;
    const totalRechazados = obraSummary?.total.rechazados ?? 0;

    // Safe divisors for donut arcs
    const rcaSafe    = Math.max(rcaTotal, 1);
    const gdcSafe    = Math.max(gdcTotal, 1);
    const totalSafe  = Math.max(totalPermisos, 1);

    if (loading) {
        return (
            <div className="flex-1 flex items-center justify-center h-full bg-background-dark text-text-secondary text-sm">
                Cargando proyecto...
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col h-full bg-background-dark overflow-y-auto w-full text-white">
            <div className="px-4 md:px-8 pt-6 pb-2">
                {/* Header Section */}
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-6">
                    <div className="flex-1 flex gap-4">
                        <button onClick={() => navigate('/active-projects')} className="text-text-secondary hover:text-white transition-colors mt-2">
                            <span className="material-symbols-outlined text-[24px]">arrow_back</span>
                        </button>
                        <div>
                            <h1 className="text-xl md:text-3xl font-black text-white uppercase tracking-tight leading-tight">
                                Permisos del Proyecto {projectName}
                            </h1>
                            <p className="text-text-secondary text-sm mt-1 font-mono tracking-widest">{permit?.codigoAconex ?? '—'}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 self-start lg:self-auto">
                        <button
                            onClick={() => { setShowRCAModal(true); resetDocModal(); }}
                            className="bg-[#8b5cf6]/10 border border-[#8b5cf6]/30 hover:bg-[#8b5cf6]/20 text-[#8b5cf6] px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest shadow-sm transition-colors h-fit flex items-center gap-1.5"
                        >
                            <span className="material-symbols-outlined text-[16px]">upload_file</span> Subir Listado de Documentos
                        </button>
                        <button className="bg-primary/10 border border-primary/30 hover:bg-primary/20 text-primary px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest shadow-sm transition-colors h-fit">
                            Externos
                        </button>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="flex flex-col gap-6">

                    {/* SECTION: 3 Donut Charts */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-surface-dark p-6 rounded-xl border border-border-dark shadow-sm">

                        {/* RCA */}
                        <div className="flex flex-col items-center">
                            <div className="flex items-center justify-center gap-1.5 mb-6 min-h-[40px] text-center w-full">
                                <h2 className="text-[10px] font-black tracking-widest uppercase text-text-secondary leading-tight">
                                    <span className="block text-[8px] text-text-secondary/70 mb-0.5">Permisos requeridos por</span>
                                    Resolución de Calificación Ambiental
                                </h2>
                                <div className="relative group flex items-center">
                                    <span className="material-symbols-outlined text-[16px] text-text-secondary/50 hover:text-white cursor-help transition-colors">info</span>
                                    <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-64 bg-slate-800 text-white text-[10px] p-2.5 rounded-lg shadow-xl border border-border-dark z-50 text-center font-normal leading-relaxed">
                                        Corresponde a los permisos requeridos por una Resolución de Calificación Ambiental (RCA). El origen del permiso es RCA dentro de la obra/actividad <strong className="text-primary">{projectName}</strong>.
                                    </div>
                                </div>
                            </div>
                            <div className="relative size-32 flex items-center justify-center">
                                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                    <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" className="text-background-dark fill-none" />
                                    <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" fill="none"
                                        className="text-green-500 drop-shadow-[0_0_8px_rgba(34,197,94,0.3)]"
                                        strokeDasharray={`${(rcaCumplidos / rcaSafe) * 251.2} 251.2`} />
                                    <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" fill="none"
                                        className="text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.3)]"
                                        strokeDasharray={`${(rcaEnProceso / rcaSafe) * 251.2} 251.2`}
                                        strokeDashoffset={`-${(rcaCumplidos / rcaSafe) * 251.2}`} />
                                    <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" fill="none"
                                        className="text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.3)]"
                                        strokeDasharray={`${(rcaRechazados / rcaSafe) * 251.2} 251.2`}
                                        strokeDashoffset={`-${((rcaCumplidos + rcaEnProceso) / rcaSafe) * 251.2}`} />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                                    <span className="text-3xl font-black text-white leading-none">{rcaTotal}</span>
                                    <span className="text-[9px] text-text-secondary font-black uppercase tracking-widest mt-1">Total</span>
                                </div>
                            </div>
                            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 w-full px-2">
                                <div className="flex flex-col items-center gap-1">
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-2 h-2 rounded-sm bg-green-500 shadow-[0_0_4px_rgba(34,197,94,0.4)]"></div>
                                        <span className="text-[8px] font-bold text-text-secondary uppercase tracking-widest leading-none">Cumplidos</span>
                                    </div>
                                    <span className="text-white font-black text-xs leading-none">{rcaCumplidos}</span>
                                </div>
                                <div className="flex flex-col items-center gap-1">
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-2 h-2 rounded-sm bg-amber-400 shadow-[0_0_4px_rgba(251,191,36,0.4)]"></div>
                                        <span className="text-[8px] font-bold text-text-secondary uppercase tracking-widest leading-none">En Proceso</span>
                                    </div>
                                    <span className="text-white font-black text-xs leading-none">{rcaEnProceso}</span>
                                </div>
                                <div className="flex flex-col items-center gap-1">
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-2 h-2 rounded-sm bg-red-500 shadow-[0_0_4px_rgba(239,68,68,0.4)]"></div>
                                        <span className="text-[8px] font-bold text-text-secondary uppercase tracking-widest leading-none">Rechazados</span>
                                    </div>
                                    <span className="text-white font-black text-xs leading-none">{rcaRechazados}</span>
                                </div>
                            </div>
                        </div>

                        {/* Gestiones de Cambio */}
                        <div className="flex flex-col items-center border-t md:border-t-0 md:border-l border-border-dark pt-6 md:pt-0">
                            <div className="flex items-center justify-center gap-1.5 mb-6 min-h-[40px] text-center w-full">
                                <h2 className="text-[10px] font-black tracking-widest uppercase text-text-secondary leading-tight">
                                    <span className="block text-[8px] text-text-secondary/70 mb-0.5">Permisos requeridos para</span>
                                    Gestión de Cambio
                                </h2>
                                <div className="relative group flex items-center">
                                    <span className="material-symbols-outlined text-[16px] text-text-secondary/50 hover:text-white cursor-help transition-colors">info</span>
                                    <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-64 bg-slate-800 text-white text-[10px] p-2.5 rounded-lg shadow-xl border border-border-dark z-50 text-center font-normal leading-relaxed">
                                        Corresponde a los permisos requeridos para una Gestión de Cambio (GDC). El origen del permiso es GDC dentro de la obra/actividad <strong className="text-primary">{projectName}</strong>.
                                    </div>
                                </div>
                            </div>
                            <div className="relative size-32 flex items-center justify-center">
                                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                    <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" className="text-background-dark fill-none" />
                                    <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" fill="none"
                                        className="text-green-500 drop-shadow-[0_0_8px_rgba(34,197,94,0.3)]"
                                        strokeDasharray={`${(gdcCumplidos / gdcSafe) * 251.2} 251.2`} />
                                    <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" fill="none"
                                        className="text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.3)]"
                                        strokeDasharray={`${(gdcEnProceso / gdcSafe) * 251.2} 251.2`}
                                        strokeDashoffset={`-${(gdcCumplidos / gdcSafe) * 251.2}`} />
                                    <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" fill="none"
                                        className="text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.3)]"
                                        strokeDasharray={`${(gdcRechazados / gdcSafe) * 251.2} 251.2`}
                                        strokeDashoffset={`-${((gdcCumplidos + gdcEnProceso) / gdcSafe) * 251.2}`} />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                                    <span className="text-3xl font-black text-white leading-none">{gdcTotal}</span>
                                    <span className="text-[9px] text-text-secondary font-black uppercase tracking-widest mt-1">Total</span>
                                </div>
                            </div>
                            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 w-full px-2">
                                <div className="flex flex-col items-center gap-1">
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-2 h-2 rounded-sm bg-green-500 shadow-[0_0_4px_rgba(34,197,94,0.4)]"></div>
                                        <span className="text-[8px] font-bold text-text-secondary uppercase tracking-widest leading-none">Cumplidos</span>
                                    </div>
                                    <span className="text-white font-black text-xs leading-none">{gdcCumplidos}</span>
                                </div>
                                <div className="flex flex-col items-center gap-1">
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-2 h-2 rounded-sm bg-amber-400 shadow-[0_0_4px_rgba(251,191,36,0.4)]"></div>
                                        <span className="text-[8px] font-bold text-text-secondary uppercase tracking-widest leading-none">En Proceso</span>
                                    </div>
                                    <span className="text-white font-black text-xs leading-none">{gdcEnProceso}</span>
                                </div>
                                <div className="flex flex-col items-center gap-1">
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-2 h-2 rounded-sm bg-red-500 shadow-[0_0_4px_rgba(239,68,68,0.4)]"></div>
                                        <span className="text-[8px] font-bold text-text-secondary uppercase tracking-widest leading-none">Rechazados</span>
                                    </div>
                                    <span className="text-white font-black text-xs leading-none">{gdcRechazados}</span>
                                </div>
                            </div>
                        </div>

                        {/* Total Permisos */}
                        <div className="flex flex-col items-center relative border-t md:border-t-0 md:border-l border-border-dark pt-6 md:pt-0">
                            <div className="flex items-center justify-center gap-1.5 mb-6 min-h-[40px] text-center w-full">
                                <h2 className="text-[10px] font-black tracking-widest uppercase text-text-secondary leading-tight">
                                    Total de Permisos en el Proyecto
                                </h2>
                                <div className="relative group flex items-center">
                                    <span className="material-symbols-outlined text-[16px] text-text-secondary/50 hover:text-white cursor-help transition-colors">info</span>
                                    <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-64 bg-slate-800 text-white text-[10px] p-2.5 rounded-lg shadow-xl border border-border-dark z-50 text-center font-normal leading-relaxed">
                                        Total de permisos enlazados a la obra/actividad <strong className="text-primary">{projectName}</strong>.
                                    </div>
                                </div>
                            </div>
                            <div className="relative size-32 flex items-center justify-center">
                                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                    <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" className="text-background-dark fill-none" />
                                    <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" fill="none"
                                        className="text-green-500 drop-shadow-[0_0_8px_rgba(34,197,94,0.3)]"
                                        strokeDasharray={`${(totalCumplidos / totalSafe) * 251.2} 251.2`} />
                                    <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" fill="none"
                                        className="text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.3)]"
                                        strokeDasharray={`${(totalEnProceso / totalSafe) * 251.2} 251.2`}
                                        strokeDashoffset={`-${(totalCumplidos / totalSafe) * 251.2}`} />
                                    <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" fill="none"
                                        className="text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.3)]"
                                        strokeDasharray={`${(totalRechazados / totalSafe) * 251.2} 251.2`}
                                        strokeDashoffset={`-${((totalCumplidos + totalEnProceso) / totalSafe) * 251.2}`} />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                                    <span className="text-3xl font-black text-white leading-none">{totalPermisos}</span>
                                    <span className="text-[9px] text-text-secondary font-black uppercase tracking-widest mt-1">Total</span>
                                </div>
                            </div>
                            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 w-full px-2">
                                <div className="flex flex-col items-center gap-1">
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-2 h-2 rounded-sm bg-green-500 shadow-[0_0_4px_rgba(34,197,94,0.4)]"></div>
                                        <span className="text-[8px] font-bold text-text-secondary uppercase tracking-widest leading-none">Cumplidos</span>
                                    </div>
                                    <span className="text-white font-black text-xs leading-none">{totalCumplidos}</span>
                                </div>
                                <div className="flex flex-col items-center gap-1">
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-2 h-2 rounded-sm bg-amber-400 shadow-[0_0_4px_rgba(251,191,36,0.4)]"></div>
                                        <span className="text-[8px] font-bold text-text-secondary uppercase tracking-widest leading-none">En Proceso</span>
                                    </div>
                                    <span className="text-white font-black text-xs leading-none">{totalEnProceso}</span>
                                </div>
                                <div className="flex flex-col items-center gap-1">
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-2 h-2 rounded-sm bg-red-500 shadow-[0_0_4px_rgba(239,68,68,0.4)]"></div>
                                        <span className="text-[8px] font-bold text-text-secondary uppercase tracking-widest leading-none">Rechazados</span>
                                    </div>
                                    <span className="text-white font-black text-xs leading-none">{totalRechazados}</span>
                                </div>
                            </div>
                            <button
                                className="absolute bottom-0 right-0 md:-right-2 text-[9px] text-primary hover:text-primary/70 font-black uppercase tracking-widest transition-colors flex items-center gap-1 mt-2"
                                onClick={() => navigate(`/project-analytics/${id}`)}
                            >
                                Ver más <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                            </button>
                        </div>

                    </div>

                    {/* SECTION: Permit Selector (standalone) */}
                    {siblingPermits.length > 1 && (
                        <div className="bg-surface-dark border border-border-dark rounded-xl p-5 shadow-sm">
                            <div className="flex items-center gap-3">
                                <label className="text-[9px] font-black text-text-secondary uppercase tracking-widest whitespace-nowrap flex items-center gap-1.5">
                                    <span className="material-symbols-outlined text-[13px]">tab</span>
                                    Ver hitos del permiso:
                                </label>
                                <div ref={permitDropdownRef} className="relative flex-1 max-w-xl">
                                    {/* Trigger button */}
                                    <button
                                        onClick={() => setDropdownOpen(o => !o)}
                                        disabled={loadingSwitch}
                                        className="w-full bg-background-dark border border-border-dark text-white rounded-lg px-3 py-2 outline-none hover:border-primary/40 focus:border-primary/60 transition-all cursor-pointer disabled:opacity-60 flex items-center justify-between gap-2"
                                    >
                                        {(() => {
                                            const sel = siblingPermits.find(p => p.codigoAconex === selectedCode);
                                            if (!sel) return <span className="text-text-secondary text-xs">Seleccionar permiso...</span>;
                                            return (
                                                <div className="flex items-center gap-2 min-w-0">
                                                    <span className="truncate font-bold text-white text-[11px]">
                                                        {sel.permisoAplicable || sel.tipoPermiso || sel.codigoAconex}
                                                    </span>
                                                    <span className="font-mono text-text-secondary text-[10px] shrink-0">{sel.codigoAconex}</span>
                                                    <span className={`shrink-0 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded border ${estadoStyles[sel.estado]}`}>
                                                        {sel.estado}
                                                    </span>
                                                </div>
                                            );
                                        })()}
                                        <span className="shrink-0">
                                            {loadingSwitch
                                                ? <span className="material-symbols-outlined text-[16px] text-primary animate-spin">progress_activity</span>
                                                : <span className={`material-symbols-outlined text-[16px] text-text-secondary transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}>expand_more</span>
                                            }
                                        </span>
                                    </button>
                                    {/* Dropdown list */}
                                    {dropdownOpen && !loadingSwitch && (
                                        <div className="absolute top-full left-0 right-0 mt-1 z-50 bg-[#1a1f2e] border border-border-dark rounded-lg shadow-2xl overflow-hidden max-h-72 overflow-y-auto">
                                            {siblingPermits.map(p => (
                                                <button
                                                    key={p.codigoAconex}
                                                    onClick={() => { handlePermitSwitch(p.codigoAconex); setDropdownOpen(false); }}
                                                    className={`w-full text-left px-3 py-2.5 flex items-center justify-between gap-3 hover:bg-slate-700/40 transition-colors ${p.codigoAconex === selectedCode ? 'bg-primary/10 border-l-2 border-l-primary' : 'border-l-2 border-l-transparent'}`}
                                                >
                                                    <div className="flex flex-col min-w-0">
                                                        <span className="text-[11px] font-bold text-white truncate">
                                                            {p.permisoAplicable || p.tipoPermiso || p.codigoAconex}
                                                        </span>
                                                        <span className="text-[9px] font-mono text-text-secondary mt-0.5">{p.codigoAconex}</span>
                                                    </div>
                                                    <span className={`shrink-0 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded border ${estadoStyles[p.estado]}`}>
                                                        {p.estado}
                                                    </span>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Progress bar: avance del permiso según hitos cumplidos */}
                    {(() => {
                        const milestoneKeys: (keyof PermitTramitacion)[] = [
                            'solicitudInfoLegal', 'entregaInformacion', 'inicioElaboracion', 'terminoElaboracion',
                            'inicioRevisionGF', 'terminoRevisionGF', 'inicioCorreccionObs', 'terminoCorreccionObs',
                            'inicioRevision0', 'terminoRevision0', 'ingresoAutoridad', 'firmaRL',
                            'fechaResolucion', 'aprobacion',
                        ];
                        const total = milestoneKeys.length;
                        const completed = permit
                            ? milestoneKeys.filter(k => (permit[k] as MilestoneDates)?.actual).length
                            : 0;
                        const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
                        const isApproved = !!(permit?.aprobacion?.actual);
                        const barColor = isApproved
                            ? 'bg-green-500'
                            : pct >= 70 ? 'bg-amber-500' : 'bg-primary';
                        return (
                            <div className="bg-surface-dark border border-border-dark rounded-xl px-6 py-4 shadow-sm">
                                <div className="flex items-center justify-between mb-2.5">
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-[16px] text-text-secondary">
                                            {isApproved ? 'verified' : 'pending'}
                                        </span>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-text-secondary">
                                            Avance del Permiso
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] text-text-secondary">
                                            {completed} de {total} hitos completados
                                        </span>
                                        <span className={`text-sm font-black ${isApproved ? 'text-green-400' : 'text-white'}`}>
                                            {pct}%
                                        </span>
                                    </div>
                                </div>
                                <div className="w-full h-2 bg-border-dark rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full transition-all duration-700 ${barColor}`}
                                        style={{ width: `${pct}%` }}
                                    />
                                </div>
                                {isApproved && (
                                    <p className="text-[10px] text-green-400 font-semibold mt-1.5 text-right">
                                        Permiso aprobado — {permit!.aprobacion.actual}
                                    </p>
                                )}
                            </div>
                        );
                    })()}

                    {/* SECTION: 5 Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        {/* Card 0: Estado del Permiso */}
                        {(() => {
                            const estado = permit?.estado ?? null;
                            const cfg: Record<string, { icon: string; iconColor: string; badgeCls: string; dotColor: string }> = {
                                'NO INICIADO':    { icon: 'radio_button_unchecked', iconColor: 'text-slate-400',  badgeCls: 'bg-slate-500/10 text-slate-400 border-slate-500/30',    dotColor: 'bg-slate-400' },
                                'EN ELABORACIÓN': { icon: 'edit_document',          iconColor: 'text-yellow-400', badgeCls: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30', dotColor: 'bg-yellow-400' },
                                'EN REVISIÓN':    { icon: 'rate_review',            iconColor: 'text-blue-400',   badgeCls: 'bg-blue-500/10 text-blue-400 border-blue-500/30',       dotColor: 'bg-blue-400' },
                                'APROBADO':       { icon: 'check_circle',           iconColor: 'text-green-400',  badgeCls: 'bg-green-500/10 text-green-400 border-green-500/30',    dotColor: 'bg-green-400' },
                                'RECHAZADO':      { icon: 'cancel',                 iconColor: 'text-red-400',    badgeCls: 'bg-red-500/10 text-red-400 border-red-500/30',          dotColor: 'bg-red-400' },
                            };
                            const c = estado ? cfg[estado] : null;
                            return (
                                <div className="bg-surface-dark border border-border-dark p-5 rounded-xl flex flex-col justify-center shadow-sm">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className={`material-symbols-outlined text-[16px] ${c?.iconColor ?? 'text-text-secondary'}`}>
                                            {c?.icon ?? 'help_outline'}
                                        </span>
                                        <span className="text-[9px] font-black text-text-secondary uppercase tracking-widest">Estado del Permiso</span>
                                    </div>
                                    {estado && c ? (
                                        <>
                                            <span className={`inline-flex items-center self-start px-2.5 py-1 rounded-lg border text-[10px] font-black uppercase tracking-wider ${c.badgeCls}`}>
                                                {estado}
                                            </span>
                                        </>
                                    ) : (
                                        <span className="text-sm font-black text-text-secondary">—</span>
                                    )}
                                </div>
                            );
                        })()}
                        {/* Card 1: Autoridad */}
                        <div className="bg-surface-dark border border-border-dark p-5 rounded-xl flex flex-col justify-center shadow-sm">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="material-symbols-outlined text-[16px] text-blue-400">account_balance</span>
                                <span className="text-[9px] font-black text-text-secondary uppercase tracking-widest">Autoridad</span>
                            </div>
                            <span className="text-sm font-black text-white uppercase tracking-wider">{permit?.autoridad ?? '—'}</span>
                            <span className="text-[10px] text-text-secondary mt-1">{permit?.gerencia ?? '—'}</span>
                        </div>
                        {/* Card 2: Tiempo Tramitación */}
                        <div className="bg-surface-dark border border-border-dark p-5 rounded-xl flex flex-col justify-center shadow-sm">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="material-symbols-outlined text-[16px] text-purple-400">timer</span>
                                <span className="text-[9px] font-black text-text-secondary uppercase tracking-widest">Tiempo Tramitación</span>
                            </div>
                            <div className="flex items-baseline gap-1">
                                <span className="text-2xl font-black text-white leading-none">
                                    {permit?.tiempoTramitacion.forecast ?? permit?.tiempoTramitacion.plan ?? '—'}
                                </span>
                                <span className="text-[10px] font-bold text-text-secondary">días en total</span>
                            </div>
                            <span className="text-[9px] text-text-secondary mt-1">
                                El plan inicial era de <strong className="text-white">{permit?.tiempoTramitacion.plan ?? '—'} días</strong>.
                            </span>
                        </div>
                        {/* Card 3: Aprobación */}
                        <div className="bg-surface-dark border border-border-dark p-5 rounded-xl flex flex-col justify-center shadow-sm">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="material-symbols-outlined text-[16px] text-green-400">event_available</span>
                                <span className="text-[9px] font-black text-text-secondary uppercase tracking-widest">Aprobación</span>
                            </div>
                            <span className="text-sm font-black text-white uppercase tracking-wider">
                                {permit?.aprobacion.forecast ?? permit?.aprobacion.plan ?? '—'}
                            </span>
                            <span className="text-[10px] text-amber-400 font-bold mt-1">
                                {permit?.aprobacion.forecast ? 'Fecha forecast' : 'Fecha plan'}
                            </span>
                        </div>
                        {/* Card 4: Resolución */}
                        <div className="bg-surface-dark border border-border-dark p-5 rounded-xl flex flex-col justify-center shadow-sm">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="material-symbols-outlined text-[16px] text-teal-400">gavel</span>
                                <span className="text-[9px] font-black text-text-secondary uppercase tracking-widest">Resolución</span>
                            </div>
                            <span className="text-xs font-bold text-white leading-snug">
                                {permit?.resolucionAprobacion ?? 'Sin resolución asignada'}
                            </span>
                        </div>
                    </div>

                    {/* SECTION: Ruta de Tramitación + Gantt + Descargas */}
                    <div className="flex flex-col gap-6">
                        {/* (charts moved above, only table and tracker remain here) */}

                        {/* El tracker de documentación ahora vive dentro de la fila del hito en la tabla inferior */}

                        {/* Table: Ruta de Tramitación */}
                        <div className="bg-surface-dark border border-border-dark rounded-xl overflow-hidden flex flex-col shadow-sm">
                            <div className="p-5 border-b border-border-dark flex flex-col gap-4">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary text-[20px]">route</span>
                                        <h2 className="text-[11px] font-black text-white uppercase tracking-widest">Ciclo de Vida del Permiso — Hitos</h2>
                                    </div>
                                    <div className="flex items-center gap-3 sm:gap-4 text-[9px] font-black uppercase tracking-widest">
                                        <span className="flex items-center gap-1.5 text-green-500"><span className="material-symbols-outlined text-[14px]">check_circle</span> Cumplido</span>
                                        <span className="flex items-center gap-1.5 text-red-500"><span className="material-symbols-outlined text-[14px]">error</span> Atrasado</span>
                                        <span className="flex items-center gap-1.5 text-amber-500"><span className="material-symbols-outlined text-[14px]">schedule</span> En proceso</span>
                                    </div>
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left font-display min-w-[800px]">
                                    <thead className="bg-background-dark/50 border-b border-border-dark">
                                        <tr>
                                            <th className="px-5 py-4 w-[35%]">
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] font-black text-text-secondary uppercase tracking-widest">Hito</span>
                                                    <span className="text-[8px] text-text-secondary/60 mt-0.5">Etapa del trámite</span>
                                                </div>
                                            </th>
                                            <th className="px-5 py-4">
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] font-black text-text-secondary uppercase tracking-widest">Plan</span>
                                                    <span className="text-[8px] text-text-secondary/60 mt-0.5">Fecha acordada al inicio</span>
                                                </div>
                                            </th>
                                            <th className="px-5 py-4">
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] font-black text-text-secondary uppercase tracking-widest">Forecast</span>
                                                    <span className="text-[8px] text-text-secondary/60 mt-0.5">Fecha en la que creemos que sucederá</span>
                                                </div>
                                            </th>
                                            <th className="px-5 py-4">
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] font-black text-text-secondary uppercase tracking-widest">Actual</span>
                                                    <span className="text-[8px] text-text-secondary/60 mt-0.5">Fecha en que realmente ocurrió</span>
                                                </div>
                                            </th>
                                            <th className="px-3 py-4 w-10"></th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-xs font-bold text-text-secondary">
                                        {(() => {
                                            const today = new Date();
                                            today.setHours(0, 0, 0, 0);
                                            // Real documents from DB, indexed by milestone_order
                                            const docsByMilestone = (milestoneOrder: number) =>
                                                documents.filter(d => d.milestone_order === milestoneOrder);

                                            // Stage 0: Obra No Iniciada / Obra Iniciada (no DB, no cuenta en barra)
                                            const obraIniciada = permit && permit.estado !== 'NO INICIADO';
                                            const stage0Row = (
                                                <tr key="stage-0" className="border-b border-border-dark hover:bg-slate-800/20 transition-colors">
                                                    <td className="px-4 py-5">
                                                        <div className="flex items-center gap-3">
                                                            {obraIniciada
                                                                ? <span className="material-symbols-outlined text-[18px] text-green-500">check_circle</span>
                                                                : <span className="material-symbols-outlined text-[18px] text-text-secondary/50">radio_button_unchecked</span>
                                                            }
                                                            <span className={`text-xs font-bold ${obraIniciada ? 'text-green-400' : 'text-text-secondary'}`}>
                                                                {obraIniciada ? 'Obra Iniciada' : 'Obra No Iniciada'}
                                                            </span>
                                                            <span className="text-[9px] font-black uppercase tracking-widest text-text-secondary/40 border border-border-dark rounded px-1.5 py-0.5 ml-1">
                                                                Etapa 0
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="px-3 py-5 text-text-secondary/40 text-xs">—</td>
                                                    <td className="px-3 py-5 text-text-secondary/40 text-xs">—</td>
                                                    <td className="px-3 py-5 text-text-secondary/40 text-xs">—</td>
                                                    <td className="px-3 py-5"></td>
                                                </tr>
                                            );

                                            return [stage0Row, ...MILESTONE_DEFS.map(({ key, label, tooltip }, idx) => {
                                                const ms = permit ? (permit[key] as MilestoneDates) : { plan: null, actual: null, forecast: null };
                                                const status = getMilestoneStatus(ms, today);
                                                const cfg = STATUS_CONFIG[status];
                                                const milestoneOrder = MILESTONE_ORDER_MAP[key] ?? 0;
                                                const mileDocs = milestoneOrder > 0 ? docsByMilestone(milestoneOrder) : [];
                                                const canExpand = milestoneOrder > 0;
                                                const mock = mileDocs.length > 0 ? mileDocs : null;
                                                const isExpanded = expandedMilestoneIdx === idx;
                                                const maxDelay = mileDocs.length > 0 ? Math.max(...mileDocs.map(d => d.dias_atraso)) : 0;

                                                // Alert color config based on real delay data
                                                const alertCfg = mock && maxDelay > 0 ? (maxDelay > 7 ? {
                                                    bg: 'bg-red-950/30 border-red-500/30',
                                                    icon: 'error', iconColor: 'text-red-500',
                                                    titleColor: 'text-red-400',
                                                    title: 'Crítico: Documentación muy atrasada',
                                                    pillBg: 'bg-red-500/10 border-red-500/20 text-red-400',
                                                } : {
                                                    bg: 'bg-orange-950/20 border-orange-500/30',
                                                    icon: 'warning', iconColor: 'text-orange-500',
                                                    titleColor: 'text-orange-400',
                                                    title: 'Atención: Documentación faltante',
                                                    pillBg: 'bg-orange-500/10 border-orange-500/20 text-orange-400',
                                                }) : null;

                                                const total = mileDocs.length;
                                                const ready = mileDocs.filter(d => d.subido).length;
                                                const pct = total > 0 ? Math.round((ready / total) * 100) : 0;
                                                const barColor = maxDelay > 7 ? 'bg-red-500' : maxDelay > 0 ? 'bg-amber-500' : 'bg-green-500';

                                                return (
                                                    <Fragment key={key}>
                                                        {/* Hito row — clickable if it has docs */}
                                                        <tr
                                                            className={`transition-colors border-b border-border-dark ${canExpand ? 'cursor-pointer hover:bg-slate-800/30' : 'hover:bg-slate-800/20'} ${isExpanded ? 'bg-slate-800/20' : ''}`}
                                                            onClick={() => canExpand && setExpandedMilestoneIdx(isExpanded ? null : idx)}
                                                        >
                                                            <td className="px-5 py-4 w-[35%]">
                                                                <div className="flex items-center gap-2 relative group w-fit">
                                                                    {cfg.dashed ? (
                                                                        <span className="material-symbols-outlined text-[16px] border border-dashed rounded-full border-text-secondary/50 text-transparent">lens</span>
                                                                    ) : (
                                                                        <span className={`material-symbols-outlined text-[16px] ${cfg.labelColor}`}>{cfg.icon}</span>
                                                                    )}
                                                                    <span className={`${cfg.labelColor} text-[11px] cursor-help`}>{label}</span>
                                                                    {mock && maxDelay > 0 && (
                                                                        <span className={`material-symbols-outlined text-[13px] ${maxDelay > 7 ? 'text-red-500' : 'text-orange-500'}`}>warning</span>
                                                                    )}
                                                                    {total > 0 && (
                                                                        <span className={`text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-full border whitespace-nowrap ${pct === 100 ? 'bg-green-500/10 border-green-500/30 text-green-400' : maxDelay > 0 ? 'bg-orange-500/10 border-orange-500/30 text-orange-400' : 'bg-slate-500/10 border-slate-500/30 text-slate-400'}`}>
                                                                            {ready}/{total} docs
                                                                        </span>
                                                                    )}
                                                                    <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block w-64 bg-slate-800 text-white text-[10px] p-2.5 rounded-lg shadow-xl border border-border-dark z-50">
                                                                        {tooltip}
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="px-5 py-4 font-mono text-[11px] text-text-secondary/70">{ms.plan ?? '—'}</td>
                                                            <td className={`px-5 py-4 font-mono text-[11px] ${cfg.dateColor}`}>{ms.forecast ?? '—'}</td>
                                                            <td className={`px-5 py-4 font-mono text-[11px] ${status === 'cumplido' ? cfg.dateColor : 'text-text-secondary/50'}`}>
                                                                <div className="flex items-center gap-1">
                                                                    {ms.actual ?? '—'}
                                                                    {ms.actual && status === 'cumplido' && <span className="material-symbols-outlined text-[14px]">check</span>}
                                                                </div>
                                                            </td>
                                                            <td className="px-3 py-4 text-center w-10">
                                                                {canExpand && (
                                                                    <span className={`material-symbols-outlined text-[18px] text-text-secondary/60 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}>
                                                                        chevron_right
                                                                    </span>
                                                                )}
                                                            </td>
                                                        </tr>

                                                        {/* Inline expanded doc panel */}
                                                        {canExpand && isExpanded && (
                                                            <tr className="bg-[#0d1220]">
                                                                <td colSpan={5} className="px-5 py-4 border-b border-border-dark">
                                                                    <div className={`rounded-xl border overflow-hidden ${alertCfg ? alertCfg.bg : 'bg-blue-950/20 border-blue-500/20'}`}>
                                                                        {/* Alert banner (only when delayed) */}
                                                                        {alertCfg && (
                                                                            <div className="px-4 py-2.5 border-b border-white/5 flex items-center justify-between">
                                                                                <div className="flex items-center gap-2">
                                                                                    <span className={`material-symbols-outlined text-[15px] ${alertCfg.iconColor}`}>{alertCfg.icon}</span>
                                                                                    <span className={`text-[10px] font-black uppercase tracking-wider ${alertCfg.titleColor}`}>{alertCfg.title}</span>
                                                                                    <span className="text-[10px] text-text-secondary">— {mileDocs.filter(d => d.dias_atraso > 0).length} requerimientos bloquean el avance.</span>
                                                                                </div>
                                                                                <div className={`flex items-center gap-1.5 ${alertCfg.pillBg} border px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider`}>
                                                                                    <span className="material-symbols-outlined text-[12px]">schedule</span>
                                                                                    Impacto: +{maxDelay} días atraso
                                                                                </div>
                                                                            </div>
                                                                        )}
                                                                        {/* Doc list */}
                                                                        <div className="p-3 flex flex-col gap-2">
                                                                            <p className="text-[9px] font-black uppercase tracking-widest text-text-secondary/60 px-1 mb-1">Documentación requerida — {mileDocs.length} documentos</p>
                                                                            {mileDocs.map((doc) => (
                                                                                <div key={doc.id} className="bg-slate-900/50 border border-slate-700/40 rounded-lg px-3 py-2.5 flex items-center justify-between">
                                                                                    <div className="flex items-center gap-2.5">
                                                                                        <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${doc.dias_atraso > 7 ? 'bg-red-500' : doc.dias_atraso > 0 ? 'bg-orange-500' : doc.subido ? 'bg-green-500' : 'bg-slate-500'}`} />
                                                                                        <div>
                                                                                            <div className="text-[11px] font-bold text-white">{doc.nombre_documento}</div>
                                                                                            <div className="flex items-center gap-1 text-[10px] text-text-secondary mt-0.5">
                                                                                                <span className="material-symbols-outlined text-[11px]">person</span>
                                                                                                <span className="uppercase tracking-wider font-bold">
                                                                                                    {[doc.nombre_responsable, doc.gerencia_responsable].filter(Boolean).join(' — ')}
                                                                                                </span>
                                                                                            </div>
                                                                                            {doc.correo_responsable && (
                                                                                                <div className="text-[10px] text-primary/70 mt-0.5">{doc.correo_responsable}</div>
                                                                                            )}
                                                                                            {doc.fecha_entrega && (
                                                                                                <div className="flex items-center gap-1 text-[10px] text-amber-400/80 mt-0.5">
                                                                                                    <span className="material-symbols-outlined text-[11px]">event</span>
                                                                                                    <span className="font-bold">Fecha tope: {doc.fecha_entrega}</span>
                                                                                                </div>
                                                                                            )}
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="flex items-center gap-3 shrink-0">
                                                                                        {doc.dias_atraso > 0 ? (
                                                                                            <span className={`text-[10px] font-bold ${doc.dias_atraso > 7 ? 'text-red-500' : 'text-orange-500'}`}>{doc.dias_atraso} días tarde</span>
                                                                                        ) : doc.subido ? (
                                                                                            <span className="text-[10px] font-bold text-green-500">Subido</span>
                                                                                        ) : (
                                                                                            <span className="text-[10px] font-bold text-text-secondary">Pendiente</span>
                                                                                        )}
                                                                                        {doc.dias_atraso > 0 && doc.correo_responsable && (
                                                                                            <a
                                                                                                href={`mailto:${doc.correo_responsable}?subject=Documento pendiente: ${doc.nombre_documento}`}
                                                                                                className="flex items-center gap-1 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/20 transition-colors px-2.5 py-1 rounded-md"
                                                                                                onClick={e => e.stopPropagation()}
                                                                                            >
                                                                                                <span className="material-symbols-outlined text-[12px]">notifications_active</span>
                                                                                                <span className="text-[9px] font-black uppercase tracking-wider">Notificar</span>
                                                                                            </a>
                                                                                        )}
                                                                                        {doc.subido ? (
                                                                                            <button onClick={(e) => { e.stopPropagation(); handleToggleDelivered(doc.id, false); }} disabled={docActionId === doc.id} className="flex items-center gap-1 text-text-secondary/70 hover:text-white border border-border-dark px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-wider transition-colors disabled:opacity-50" title="Deshacer entrega">
                                                                                                <span className="material-symbols-outlined text-[12px]">undo</span>
                                                                                            </button>
                                                                                        ) : (
                                                                                            <button onClick={(e) => { e.stopPropagation(); handleToggleDelivered(doc.id, true); }} disabled={docActionId === doc.id} className="flex items-center gap-1 bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/20 px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-wider transition-colors disabled:opacity-50">
                                                                                                <span className="material-symbols-outlined text-[12px]">task_alt</span> Marcar entregado
                                                                                            </button>
                                                                                        )}
                                                                                        <button onClick={(e) => { e.stopPropagation(); handleDeleteDoc(doc.id); }} disabled={docActionId === doc.id} title="Eliminar documento" className="p-1 rounded-md hover:bg-white/5 text-text-secondary/50 hover:text-red-400 transition-colors disabled:opacity-50">
                                                                                            <span className="material-symbols-outlined text-[14px]">delete</span>
                                                                                        </button>
                                                                                    </div>
                                                                                </div>
                                                                            ))}
                                                                            {mileDocs.length === 0 && (
                                                                                <p className="text-[10px] text-text-secondary/60 italic px-1 py-2">Aún no hay documentos requeridos en este hito. Añade el primero.</p>
                                                                            )}
                                                                            {/* Alta de documento requerido (abre modal) */}
                                                                            <button onClick={(e) => { e.stopPropagation(); setAddDocMilestone(milestoneOrder); setNewDoc(emptyNewDoc); }} className="self-start flex items-center gap-1.5 mt-1 text-[10px] font-black uppercase tracking-wider text-emerald-400 hover:text-emerald-300 transition-colors">
                                                                                <span className="material-symbols-outlined text-[15px]">add_circle</span> Añadir documento requerido
                                                                            </button>
                                                                        </div>
                                                                        {/* Progress bar */}
                                                                        <div className="px-4 pb-3 pt-1">
                                                                            <div className="flex items-center justify-between text-[8px] font-black uppercase tracking-widest mb-1.5">
                                                                                <span className="text-text-secondary">{ready} de {total} documentos subidos</span>
                                                                                <span className={pct === 100 ? 'text-green-400' : pct >= 50 ? 'text-blue-400' : 'text-orange-400'}>{pct}%</span>
                                                                            </div>
                                                                            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                                                                                <div className={`h-full rounded-full transition-all duration-500 ${barColor}`} style={{ width: `${Math.max(pct, pct > 0 ? 2 : 0)}%` }} />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        )}
                                                    </Fragment>
                                                );
                                            })];
                                        })()}
                                        <tr className="bg-background-dark/30 hover:bg-background-dark/50 transition-colors border-t border-border-dark">
                                            <td className="px-5 py-5">
                                                <div className="flex items-center gap-2">
                                                    <span className="material-symbols-outlined text-[18px] text-blue-400">timer</span>
                                                    <span className="text-white font-black text-[11px] uppercase tracking-widest">TIEMPO TRAMITACIÓN (DÍAS)</span>
                                                </div>
                                            </td>
                                            <td className="px-5 py-5 text-white font-black text-sm">
                                                {permit?.tiempoTramitacion.plan ?? '—'}
                                            </td>
                                            <td className="px-5 py-5 text-amber-400 font-black text-sm">
                                                {permit?.tiempoTramitacion.forecast ?? '—'}
                                            </td>
                                            <td className="px-5 py-5 text-text-secondary/50">
                                                {permit?.tiempoTramitacion.actual ?? '—'}
                                            </td>
                                            <td className="px-3 py-5"></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>


                    {/* LAST SECTION: Descargas y Notificaciones */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6">
                        {/* Centro de descargas */}
                        <div className="bg-surface-dark rounded-xl shadow-sm border border-border-dark p-6 md:p-8 flex flex-col items-center justify-center text-center hover:border-primary/50 transition-colors">
                            <span className="material-symbols-outlined text-[32px] text-primary/50 mb-4">folder_special</span>
                            <h2 className="text-sm font-black text-white leading-relaxed mb-4">
                                Para más detalles, accede a nuestro<br />centro de descarga de permisos
                            </h2>
                            <button
                                onClick={() => setShowDownloads(true)}
                                className="inline-flex items-center justify-center gap-2 w-full max-w-[200px] py-3 px-4 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary transition-all text-[11px] font-black uppercase tracking-widest border border-primary/20"
                            >
                                <span className="material-symbols-outlined text-[18px]">cloud_download</span>
                                Enlace descargas
                            </button>
                        </div>

                        {/* Notificaciones */}
                        <div className="bg-surface-dark rounded-xl shadow-sm border border-border-dark p-6 md:p-8 flex flex-col items-center justify-center text-center hover:border-text-secondary/50 transition-colors">
                            <span className="material-symbols-outlined text-[32px] text-text-secondary/50 mb-4">notifications_active</span>
                            <h2 className="text-sm font-black text-white leading-relaxed mb-4">
                                ¿Deseas recibir notificaciones sobre <br />
                                los permisos del proyecto {projectName}?
                            </h2>
                            <button
                                onClick={() => setShowNotifications(true)}
                                className="inline-flex items-center justify-center gap-2 w-full max-w-[200px] py-3 px-4 rounded-xl bg-slate-800/80 text-text-secondary hover:text-white border border-slate-700 hover:border-slate-600 transition-all text-[11px] font-black uppercase tracking-widest shadow-sm"
                            >
                                <span className="material-symbols-outlined text-[18px]">campaign</span>
                                Configurar alertas
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* MODALS */}

            {/* Modal: Subir Listado de Documentos */}
            {showRCAModal && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-[#1a1f2e] border border-border-dark rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col overflow-hidden max-h-[90vh]">
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-border-dark flex-shrink-0">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-[#8b5cf6] text-[20px]">upload_file</span>
                                <h2 className="text-sm font-black uppercase tracking-widest text-white">Agente IA — Listado de Documentos</h2>
                            </div>
                            <button onClick={() => { setShowRCAModal(false); resetDocModal(); }} className="text-text-secondary hover:text-white transition-colors">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>

                        <div className="p-6 flex flex-col gap-5 overflow-y-auto">

                            {/* STEP: upload */}
                            {docStep === 'upload' && (
                                <>
                                    <p className="text-xs text-text-secondary leading-relaxed">
                                        Sube un PDF con el listado de documentos requeridos. El Agente IA leerá el documento, extraerá responsables, gerencias, correos y fechas, e identificará a qué permiso e hito corresponde cada uno.
                                    </p>
                                    <label className={`flex flex-col items-center justify-center gap-3 border-2 border-dashed rounded-xl py-10 px-4 cursor-pointer transition-colors ${docFile ? 'border-[#8b5cf6]/60 bg-[#8b5cf6]/5' : 'border-border-dark hover:border-[#8b5cf6]/40 hover:bg-slate-800/20'}`}>
                                        <span className="material-symbols-outlined text-[40px] text-text-secondary/50">upload_file</span>
                                        <span className="text-xs text-text-secondary text-center">
                                            {docFile
                                                ? <span className="text-[#8b5cf6] font-bold">{docFile.name}</span>
                                                : <>Arrastra un PDF aquí o <span className="text-[#8b5cf6] underline">haz clic para seleccionar</span></>
                                            }
                                        </span>
                                        <input type="file" accept=".pdf" className="hidden" onChange={e => { setDocFile(e.target.files?.[0] ?? null); }} />
                                    </label>
                                    <button
                                        onClick={handleAnalyzeDocs}
                                        disabled={!docFile || !permit}
                                        className="flex items-center justify-center gap-2 bg-[#8b5cf6]/20 hover:bg-[#8b5cf6]/30 disabled:opacity-50 disabled:cursor-not-allowed text-[#8b5cf6] border border-[#8b5cf6]/30 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-[16px]">auto_awesome</span> Analizar con IA
                                    </button>

                                    {/* Validación de calidad documental (sub-producto 2 — RAG) */}
                                    <div className="flex items-center gap-3">
                                        <div className="flex-1 h-px bg-border-dark" />
                                        <span className="text-[10px] uppercase tracking-widest text-text-secondary/60">o valida su calidad contra la RCA</span>
                                        <div className="flex-1 h-px bg-border-dark" />
                                    </div>
                                    {documents.length > 0 && (
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-[10px] text-text-secondary uppercase tracking-widest">Asociar a un documento (opcional — guarda el veredicto y notifica al responsable):</label>
                                            <select
                                                className="bg-background-dark border border-border-dark text-white text-xs rounded-lg px-3 py-2 outline-none focus:border-emerald-500/60"
                                                value={validateTargetDocId ?? ''}
                                                onChange={e => setValidateTargetDocId(e.target.value ? Number(e.target.value) : null)}
                                            >
                                                <option value="">— Solo validar (sin guardar veredicto) —</option>
                                                {documents.map(d => (
                                                    <option key={d.id} value={d.id}>{d.nombre_documento}</option>
                                                ))}
                                            </select>
                                        </div>
                                    )}
                                    <button
                                        onClick={handleValidateQuality}
                                        disabled={!docFile || !permit}
                                        className="flex items-center justify-center gap-2 bg-emerald-500/15 hover:bg-emerald-500/25 disabled:opacity-50 disabled:cursor-not-allowed text-emerald-400 border border-emerald-500/30 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-[16px]">verified</span> Validar calidad (RAG)
                                    </button>
                                </>
                            )}

                            {/* STEP: analyzing */}
                            {docStep === 'analyzing' && (
                                <div className="flex flex-col items-center justify-center py-12 gap-4">
                                    <span className="material-symbols-outlined animate-spin text-[#8b5cf6] text-[40px]">progress_activity</span>
                                    <p className="text-sm text-text-secondary font-semibold">El Agente IA está analizando el documento...</p>
                                    <p className="text-xs text-text-secondary/60">Esto puede tomar unos segundos</p>
                                </div>
                            )}

                            {/* STEP: validating quality */}
                            {docStep === 'validating' && (
                                <div className="flex flex-col items-center justify-center py-12 gap-4">
                                    <span className="material-symbols-outlined animate-spin text-emerald-400 text-[40px]">progress_activity</span>
                                    <p className="text-sm text-text-secondary font-semibold">Validando calidad contra la RCA del WBS...</p>
                                    <p className="text-xs text-text-secondary/60">Validación estructural + análisis semántico (RAG)</p>
                                </div>
                            )}

                            {/* STEP: quality verdict */}
                            {docStep === 'verdict' && qualityVerdict && (() => {
                                const v = qualityVerdict.veredicto;
                                const aprobado = v === 'APROBADO';
                                const conObs = v === 'APROBADO_CON_OBSERVACIONES';
                                const rechazado = v.startsWith('RECHAZADO');
                                const palette = aprobado
                                    ? { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-400', icon: 'check_circle' }
                                    : conObs
                                        ? { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400', icon: 'warning' }
                                        : rechazado
                                            ? { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-400', icon: 'cancel' }
                                            : { bg: 'bg-slate-500/10', border: 'border-slate-500/30', text: 'text-slate-400', icon: 'help' };
                                const score = qualityVerdict.score_coherencia;
                                return (
                                    <>
                                        <div className={`flex items-start gap-3 ${palette.bg} border ${palette.border} rounded-xl p-4`}>
                                            <span className={`material-symbols-outlined ${palette.text} text-[22px] flex-shrink-0`}>{palette.icon}</span>
                                            <div className="flex flex-col gap-1">
                                                <p className={`text-xs font-black ${palette.text} uppercase tracking-widest`}>{v.replace(/_/g, ' ')}</p>
                                                {typeof score === 'number' && (
                                                    <p className="text-xs text-text-secondary">Coherencia con la RCA: <span className="font-bold text-white">{(score * 100).toFixed(0)}%</span></p>
                                                )}
                                                {qualityVerdict.observaciones && (
                                                    <p className="text-xs text-text-secondary mt-1">{qualityVerdict.observaciones}</p>
                                                )}
                                            </div>
                                        </div>

                                        {qualityVerdict.evidencia && qualityVerdict.evidencia.length > 0 && (
                                            <div className="flex flex-col gap-2">
                                                <p className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Evidencia (cláusulas RCA más cercanas)</p>
                                                <div className="flex flex-col gap-1 max-h-40 overflow-y-auto pr-1">
                                                    {qualityVerdict.evidencia.slice(0, 5).map((ev, i) => (
                                                        <div key={i} className="bg-background-dark border border-border-dark rounded-lg px-3 py-2">
                                                            <div className="flex items-center justify-between gap-2">
                                                                <p className="text-[11px] font-bold text-white">{ev.clausula_rca || 'Cláusula RCA'}</p>
                                                                {typeof ev.similitud === 'number' && (
                                                                    <span className="text-[10px] text-emerald-400 font-mono">{(ev.similitud * 100).toFixed(0)}%</span>
                                                                )}
                                                            </div>
                                                            {ev.fragmento_doc && <p className="text-[10px] text-text-secondary mt-0.5">{ev.fragmento_doc}</p>}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {validateTargetDocId != null && (
                                            <div className="text-[11px] flex flex-col gap-0.5">
                                                <p className={qualityVerdict.persistido ? 'text-emerald-400' : 'text-amber-400'}>
                                                    {qualityVerdict.persistido
                                                        ? '✓ Veredicto guardado en el historial del documento.'
                                                        : `⚠ No se pudo guardar el veredicto${qualityVerdict.persistido_error ? ': ' + qualityVerdict.persistido_error : '.'}`}
                                                </p>
                                                {qualityVerdict.notificado && <p className="text-emerald-400">✓ Notificación enviada al responsable del documento.</p>}
                                            </div>
                                        )}

                                        <button onClick={resetDocModal} className="text-xs text-text-secondary border border-border-dark px-4 py-2.5 rounded-xl hover:border-slate-500 hover:text-white transition-colors font-bold uppercase tracking-widest">
                                            Validar otro documento
                                        </button>
                                    </>
                                );
                            })()}

                            {/* STEP: review */}
                            {docStep === 'review' && docAnalysis && (() => {
                                const isBlank = docAnalysis.status === 'blank';
                                const hasIncomplete = docAnalysis.status === 'incomplete';
                                const detectedCurrent = permit && docAnalysis.detected_permits.includes(permit.codigoAconex);
                                const detectedOther = docAnalysis.detected_permits.filter(c => c !== permit?.codigoAconex);
                                const noPermitDetected = docAnalysis.detected_permits.length === 0;
                                const canSave = !isBlank && docTargetPermitId !== null && docAnalysis.documentos.length > 0;

                                return (
                                    <>
                                        {/* Blank error */}
                                        {isBlank && (
                                            <div className="flex items-start gap-3 bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                                                <span className="material-symbols-outlined text-red-400 text-[20px] flex-shrink-0">error</span>
                                                <div>
                                                    <p className="text-xs font-black text-red-400 uppercase tracking-widest mb-1">Documento en blanco o ilegible</p>
                                                    {docAnalysis.warnings.map((w, i) => <p key={i} className="text-xs text-red-300">{w}</p>)}
                                                    <button onClick={resetDocModal} className="mt-3 text-xs text-red-400 underline hover:text-red-300">Volver a subir</button>
                                                </div>
                                            </div>
                                        )}

                                        {/* Incomplete fields warning */}
                                        {!isBlank && hasIncomplete && (
                                            <div className="flex items-start gap-3 bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
                                                <span className="material-symbols-outlined text-amber-400 text-[20px] flex-shrink-0">warning</span>
                                                <div className="flex flex-col gap-1">
                                                    <p className="text-xs font-black text-amber-400 uppercase tracking-widest">Campos incompletos detectados</p>
                                                    {docAnalysis.warnings.map((w, i) => <p key={i} className="text-xs text-amber-300">{w}</p>)}
                                                    <p className="text-xs text-text-secondary mt-1">Puedes continuar igualmente o revisar el documento y volver a subirlo.</p>
                                                </div>
                                            </div>
                                        )}

                                        {/* Permit assignment */}
                                        {!isBlank && (
                                            <div className="bg-surface border border-border-dark rounded-xl p-4 flex flex-col gap-3">
                                                <p className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Permiso de destino</p>
                                                {detectedCurrent && (
                                                    <div className="flex items-center gap-2 text-green-400">
                                                        <span className="material-symbols-outlined text-[16px]">check_circle</span>
                                                        <span className="text-xs font-bold">Detectado: <span className="font-mono">{permit?.codigoAconex}</span> (permiso actual)</span>
                                                    </div>
                                                )}
                                                {detectedOther.length > 0 && (
                                                    <div className="flex items-start gap-2 text-amber-400">
                                                        <span className="material-symbols-outlined text-[16px]">info</span>
                                                        <div>
                                                            <p className="text-xs font-bold">Otros permisos detectados en el documento:</p>
                                                            {detectedOther.map(c => <p key={c} className="text-xs font-mono text-text-secondary">{c}</p>)}
                                                            <p className="text-xs text-text-secondary mt-1">Los documentos se subirán al permiso seleccionado abajo.</p>
                                                        </div>
                                                    </div>
                                                )}
                                                {noPermitDetected && (
                                                    <div className="flex items-start gap-2 text-amber-400">
                                                        <span className="material-symbols-outlined text-[16px]">help</span>
                                                        <div>
                                                            <p className="text-xs font-bold">No se detectó código de permiso en el documento.</p>
                                                            <p className="text-xs text-text-secondary">¿Deseas subir los documentos al permiso actualmente seleccionado?</p>
                                                        </div>
                                                    </div>
                                                )}
                                                {/* Permit selector */}
                                                <div className="flex flex-col gap-1.5">
                                                    <label className="text-[10px] text-text-secondary uppercase tracking-widest">Subir a:</label>
                                                    <select
                                                        className="bg-background-dark border border-border-dark text-white text-xs rounded-lg px-3 py-2 outline-none focus:border-[#8b5cf6]/60"
                                                        value={docTargetPermitId ?? ''}
                                                        onChange={e => setDocTargetPermitId(e.target.value ? Number(e.target.value) : null)}
                                                    >
                                                        <option value="">— Selecciona un permiso —</option>
                                                        {siblingPermits.map(p => (
                                                            <option key={p.id} value={p.id}>
                                                                {p.codigoAconex} {p.id === permit?.id ? '(actual)' : ''}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    {!docTargetPermitId && (
                                                        <p className="text-[10px] text-amber-400">Debes seleccionar un permiso para guardar los documentos.</p>
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        {/* Documents preview */}
                                        {!isBlank && docAnalysis.documentos.length > 0 && (
                                            <div className="flex flex-col gap-2">
                                                <p className="text-[10px] font-black uppercase tracking-widest text-text-secondary">{docAnalysis.documentos.length} documentos extraídos</p>
                                                <div className="flex flex-col gap-1 max-h-48 overflow-y-auto pr-1">
                                                    {docAnalysis.documentos.map((doc, i) => (
                                                        <div key={i} className="bg-background-dark border border-border-dark rounded-lg px-3 py-2 flex items-start justify-between gap-2">
                                                            <div>
                                                                <p className="text-xs font-bold text-white">{doc.nombre_documento}</p>
                                                                <p className="text-[10px] text-text-secondary">{[doc.nombre_responsable, doc.gerencia_responsable].filter(Boolean).join(' — ') || 'Sin responsable'}</p>
                                                            </div>
                                                            {doc.missing_fields.length > 0 && (
                                                                <span className="text-[9px] text-amber-400 font-bold uppercase tracking-widest flex-shrink-0">
                                                                    {doc.missing_fields.length} campo{doc.missing_fields.length > 1 ? 's' : ''} vacío{doc.missing_fields.length > 1 ? 's' : ''}
                                                                </span>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Actions */}
                                        {!isBlank && (
                                            <div className="flex gap-3">
                                                <button onClick={resetDocModal} className="flex-1 text-xs text-text-secondary border border-border-dark px-4 py-2.5 rounded-xl hover:border-slate-500 hover:text-white transition-colors font-bold uppercase tracking-widest">
                                                    Volver a subir
                                                </button>
                                                <button
                                                    onClick={handleSaveDocs}
                                                    disabled={!canSave}
                                                    className="flex-1 flex items-center justify-center gap-2 bg-[#8b5cf6]/20 hover:bg-[#8b5cf6]/30 disabled:opacity-50 disabled:cursor-not-allowed text-[#8b5cf6] border border-[#8b5cf6]/30 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-colors"
                                                >
                                                    <span className="material-symbols-outlined text-[15px]">save</span> Guardar documentos
                                                </button>
                                            </div>
                                        )}
                                    </>
                                );
                            })()}

                            {/* STEP: saving */}
                            {docStep === 'saving' && (
                                <div className="flex flex-col items-center justify-center py-12 gap-4">
                                    <span className="material-symbols-outlined animate-spin text-green-400 text-[40px]">progress_activity</span>
                                    <p className="text-sm text-text-secondary font-semibold">Guardando documentos en la base de datos...</p>
                                </div>
                            )}

                            {/* STEP: done */}
                            {docStep === 'done' && (
                                <div className="flex flex-col items-center justify-center py-10 gap-4">
                                    <span className="material-symbols-outlined text-green-400 text-[48px]">check_circle</span>
                                    <p className="text-sm font-black text-green-400 uppercase tracking-widest">Documentos guardados</p>
                                    {docSaveMsg && <p className="text-xs text-text-secondary text-center">{docSaveMsg}</p>}
                                    <button onClick={() => { setShowRCAModal(false); resetDocModal(); }} className="mt-2 text-xs text-[#8b5cf6] border border-[#8b5cf6]/30 px-5 py-2.5 rounded-xl font-black uppercase tracking-widest hover:bg-[#8b5cf6]/10 transition-colors">
                                        Cerrar
                                    </button>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            )}

            {/* Modal de Descargas */}
            {showDownloads && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-background-dark/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <div className="bg-surface-dark border border-border-dark rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh] animate-in slide-in-from-bottom-4 duration-300">
                        <div className="px-6 py-5 border-b border-border-dark flex items-center justify-between bg-slate-800/20">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary text-[24px]">cloud_done</span>
                                <h2 className="text-[11px] font-black uppercase tracking-widest text-white">Centro de Documentos de la Obra</h2>
                            </div>
                            <button onClick={() => setShowDownloads(false)} className="text-text-secondary hover:text-white transition-colors bg-background-dark/50 p-1.5 rounded-lg border border-border-dark hover:border-slate-600">
                                <span className="material-symbols-outlined text-[18px]">close</span>
                            </button>
                        </div>
                        <div className="p-6 overflow-y-auto flex-1">
                            <p className="text-xs text-text-secondary/80 mb-6 leading-relaxed font-medium">
                                Documentos de la obra <span className="text-white font-bold">{projectName}</span>. Al subir un documento, el agente de calidad lo valida automáticamente; si lo aprueba, se almacena de forma segura y queda enlazado a esta obra.
                            </p>

                            {/* ── Subir documento ── */}
                            <div className="bg-background-dark border border-border-dark rounded-xl p-5 mb-6">
                                <h3 className="text-[10px] font-black text-text-secondary uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-[16px] text-emerald-400">upload_file</span>
                                    Subir documento
                                </h3>

                                {uploadStep === 'analyzing' ? (
                                    <div className="flex flex-col items-center justify-center py-8 gap-3">
                                        <span className="material-symbols-outlined animate-spin text-emerald-400 text-[32px]">progress_activity</span>
                                        <p className="text-xs text-text-secondary font-semibold">Analizando concordancia con la obra (IA)...</p>
                                    </div>
                                ) : uploadStep === 'uploading' ? (
                                    <div className="flex flex-col items-center justify-center py-8 gap-3">
                                        <span className="material-symbols-outlined animate-spin text-emerald-400 text-[32px]">progress_activity</span>
                                        <p className="text-xs text-text-secondary font-semibold">Subiendo y guardando el documento...</p>
                                    </div>
                                ) : uploadStep === 'analyzed' && analyzeResult ? (() => {
                                    const a = analyzeResult;
                                    const r = a.resultado;
                                    const palette = r === 'ALTA'
                                        ? { bg: 'bg-green-500/10', bd: 'border-green-500/30', tx: 'text-green-400', ic: 'check_circle', title: 'Concuerda con la obra' }
                                        : r === 'DUDOSA'
                                            ? { bg: 'bg-amber-500/10', bd: 'border-amber-500/30', tx: 'text-amber-400', ic: 'help', title: 'Concordancia dudosa' }
                                            : r === 'NULA'
                                                ? { bg: 'bg-red-500/10', bd: 'border-red-500/30', tx: 'text-red-400', ic: 'cancel', title: 'No concuerda con la obra' }
                                                : r === 'ILEGIBLE'
                                                    ? { bg: 'bg-red-500/10', bd: 'border-red-500/30', tx: 'text-red-400', ic: 'visibility_off', title: 'Documento ilegible' }
                                                    : { bg: 'bg-amber-500/10', bd: 'border-amber-500/30', tx: 'text-amber-400', ic: 'warning', title: 'Título de la obra insuficiente' };
                                    return (
                                        <div className="flex flex-col gap-3">
                                            <div className={`flex items-start gap-3 ${palette.bg} border ${palette.bd} rounded-lg p-4`}>
                                                <span className={`material-symbols-outlined ${palette.tx} text-[20px]`}>{palette.ic}</span>
                                                <div className="flex flex-col gap-1">
                                                    <p className={`text-xs font-black ${palette.tx} uppercase tracking-widest`}>{palette.title}</p>
                                                    {a.titulo_obra && <p className="text-[10px] text-text-secondary/70">Obra: <span className="text-white font-bold">{a.titulo_obra}</span></p>}
                                                    <p className="text-[11px] text-text-secondary mt-0.5">{a.mensaje}</p>
                                                    {a.como_solucionar && <p className="text-[11px] text-text-secondary mt-1"><span className="font-bold text-white">Cómo solucionarlo:</span> {a.como_solucionar}</p>}
                                                </div>
                                            </div>
                                            <div className="flex gap-3">
                                                <button onClick={resetUpload} className="flex items-center gap-1.5 text-[11px] text-text-secondary border border-border-dark px-4 py-2.5 rounded-xl hover:border-slate-500 hover:text-white transition-colors font-bold uppercase tracking-widest">
                                                    <span className="material-symbols-outlined text-[15px]">arrow_back</span> Cancelar
                                                </button>
                                                <button onClick={handleUploadObraDoc} className="flex items-center gap-1.5 bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 border border-emerald-500/30 px-4 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-colors">
                                                    <span className="material-symbols-outlined text-[15px]">cloud_upload</span> Subir de todas formas
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })() : uploadStep === 'result' && uploadResult ? (() => {
                                    const r = uploadResult;
                                    const ok = r.aprobado;
                                    const palette = ok
                                        ? (r.advertencia
                                            ? { bg: 'bg-amber-500/10', bd: 'border-amber-500/30', tx: 'text-amber-400', ic: 'warning' }
                                            : { bg: 'bg-green-500/10', bd: 'border-green-500/30', tx: 'text-green-400', ic: 'check_circle' })
                                        : { bg: 'bg-red-500/10', bd: 'border-red-500/30', tx: 'text-red-400', ic: 'cancel' };
                                    return (
                                        <div className="flex flex-col gap-3">
                                            <div className={`flex items-start gap-3 ${palette.bg} border ${palette.bd} rounded-lg p-4`}>
                                                <span className={`material-symbols-outlined ${palette.tx} text-[20px]`}>{palette.ic}</span>
                                                <div className="flex flex-col gap-1">
                                                    <p className={`text-xs font-black ${palette.tx} uppercase tracking-widest`}>
                                                        {ok ? (r.advertencia ? 'Aprobado con observaciones' : 'Documento aprobado y guardado') : 'Subida rechazada por la IA'}
                                                    </p>
                                                    <p className="text-[11px] text-text-secondary">
                                                        Veredicto: <span className="font-mono">{r.veredicto.replace(/_/g, ' ')}</span>
                                                        {typeof r.score_coherencia === 'number' ? ` · coherencia con la RCA ${(r.score_coherencia * 100).toFixed(0)}%` : ''}
                                                    </p>
                                                    {r.observaciones && <p className="text-[11px] text-text-secondary mt-1">{r.observaciones}</p>}
                                                    {!ok && <p className="text-[11px] text-red-300 mt-1">El documento no se guardó. Corrige el problema y vuelve a intentarlo.</p>}
                                                </div>
                                            </div>
                                            <button onClick={resetUpload} className="self-start text-[11px] text-text-secondary border border-border-dark px-4 py-2 rounded-lg hover:border-slate-500 hover:text-white transition-colors font-bold uppercase tracking-widest">
                                                Subir otro documento
                                            </button>
                                        </div>
                                    );
                                })() : (
                                    <div className="flex flex-col gap-3">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            <div className="flex flex-col gap-1.5">
                                                <label className="text-[9px] font-black text-text-secondary uppercase tracking-widest ml-1">Categoría</label>
                                                <select value={uploadCategoria} onChange={e => setUploadCategoria(e.target.value)} className="bg-surface border border-border-dark text-white rounded-lg px-3 py-2 text-xs outline-none w-full">
                                                    <option value="RCA" className="bg-[#1e293b]">RCA</option>
                                                    <option value="RESOLUCION" className="bg-[#1e293b]">Resolución</option>
                                                    <option value="JUNTA_VECINOS" className="bg-[#1e293b]">Acta junta de vecinos</option>
                                                    <option value="INSTRUCTIVO" className="bg-[#1e293b]">Instructivo</option>
                                                    <option value="OTRO" className="bg-[#1e293b]">Otro</option>
                                                </select>
                                            </div>
                                            <label className="flex flex-col gap-1.5 cursor-pointer">
                                                <span className="text-[9px] font-black text-text-secondary uppercase tracking-widest ml-1">Archivo (PDF)</span>
                                                <div className="bg-surface border border-border-dark rounded-lg px-3 py-2 text-xs text-text-secondary hover:border-emerald-500/50 transition-colors flex items-center gap-2 overflow-hidden">
                                                    <span className="material-symbols-outlined text-[16px] text-text-secondary/60 shrink-0">attach_file</span>
                                                    <span className="truncate">{uploadFile ? <span className="text-emerald-400 font-bold">{uploadFile.name}</span> : 'Selecciona un PDF...'}</span>
                                                    <input type="file" accept=".pdf" className="hidden" onChange={e => setUploadFile(e.target.files?.[0] ?? null)} />
                                                </div>
                                            </label>
                                        </div>
                                        <button
                                            onClick={handleAnalyzeObraDoc}
                                            disabled={!uploadFile}
                                            className="self-start flex items-center gap-2 bg-emerald-500/15 hover:bg-emerald-500/25 disabled:opacity-50 disabled:cursor-not-allowed text-emerald-400 border border-emerald-500/30 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-colors"
                                        >
                                            <span className="material-symbols-outlined text-[16px]">auto_awesome</span> Analizar documento
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* ── Listado de documentos de la obra ── */}
                            <div>
                                <h3 className="text-[10px] font-black text-text-secondary uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-[16px] text-primary">folder_open</span>
                                    Documentos de la obra ({obraDocs.length})
                                </h3>
                                {obraDocsLoading ? (
                                    <div className="text-center py-10 text-text-secondary text-xs">
                                        <span className="material-symbols-outlined animate-spin mr-2 align-middle">progress_activity</span>Cargando documentos...
                                    </div>
                                ) : obraDocs.length === 0 ? (
                                    <div className="bg-background-dark border border-border-dark border-dashed rounded-xl px-6 py-10 text-center text-text-secondary text-xs italic">
                                        Aún no hay documentos subidos para esta obra.
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {obraDocs.map(doc => (
                                            <div key={doc.id} className="bg-background-dark border border-border-dark p-4 rounded-xl flex items-center justify-between gap-2 hover:border-primary/50 transition-all">
                                                <div className="flex items-center gap-3 min-w-0">
                                                    <span className="material-symbols-outlined text-red-500 text-[26px] shrink-0">picture_as_pdf</span>
                                                    <div className="flex flex-col min-w-0">
                                                        <span className="text-[11px] font-bold text-white truncate">{doc.nombre_archivo}</span>
                                                        <span className="text-[9px] text-text-secondary/70 mt-0.5">
                                                            <span className="text-primary/80 font-bold uppercase">{doc.categoria.replace(/_/g, ' ')}</span>
                                                            {doc.size_bytes ? ` · ${(doc.size_bytes / 1024 / 1024).toFixed(1)} MB` : ''}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-1 shrink-0">
                                                    <a href={obraDocumentDownloadUrl(doc.id)} target="_blank" rel="noopener noreferrer" title="Descargar" className="p-1.5 rounded-lg hover:bg-white/5 text-text-secondary/60 hover:text-primary transition-colors">
                                                        <span className="material-symbols-outlined text-[20px]">download</span>
                                                    </a>
                                                    <button onClick={() => handleDeleteObraDoc(doc.id)} title="Eliminar" className="p-1.5 rounded-lg hover:bg-white/5 text-text-secondary/60 hover:text-red-400 transition-colors">
                                                        <span className="material-symbols-outlined text-[20px]">delete</span>
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal: Añadir documento requerido a un hito */}
            {addDocMilestone !== null && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-background-dark/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <div className="bg-surface-dark border border-border-dark rounded-2xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">
                        <div className="px-6 py-5 border-b border-border-dark flex items-center justify-between bg-slate-800/20">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-emerald-400 text-[24px]">note_add</span>
                                <h2 className="text-[11px] font-black uppercase tracking-widest text-white">Añadir documento requerido</h2>
                            </div>
                            <button onClick={() => { setAddDocMilestone(null); setNewDoc(emptyNewDoc); }} className="text-text-secondary hover:text-white transition-colors bg-background-dark/50 p-1.5 rounded-lg border border-border-dark hover:border-slate-600">
                                <span className="material-symbols-outlined text-[18px]">close</span>
                            </button>
                        </div>
                        <div className="p-6 flex flex-col gap-4">
                            <p className="text-xs text-text-secondary leading-relaxed">Documento requerido para este hito. Define su responsable y fecha límite; cuando se marque como entregado avanzará el progreso del hito.</p>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[9px] font-black text-text-secondary uppercase tracking-widest ml-1">Nombre del documento *</label>
                                <input value={newDoc.nombre_documento} onChange={e => setNewDoc({ ...newDoc, nombre_documento: e.target.value })} placeholder="Ej: Informe de Línea Base" className="bg-surface border border-border-dark text-white rounded-lg px-3 py-2 text-xs outline-none focus:border-emerald-500/60 placeholder:text-text-secondary/40 w-full" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[9px] font-black text-text-secondary uppercase tracking-widest ml-1">Responsable</label>
                                    <input value={newDoc.nombre_responsable} onChange={e => setNewDoc({ ...newDoc, nombre_responsable: e.target.value })} className="bg-surface border border-border-dark text-white rounded-lg px-3 py-2 text-xs outline-none focus:border-emerald-500/60 w-full" />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[9px] font-black text-text-secondary uppercase tracking-widest ml-1">Correo del responsable</label>
                                    <input value={newDoc.correo_responsable} onChange={e => setNewDoc({ ...newDoc, correo_responsable: e.target.value })} type="email" placeholder="responsable@..." className="bg-surface border border-border-dark text-white rounded-lg px-3 py-2 text-xs outline-none focus:border-emerald-500/60 placeholder:text-text-secondary/40 w-full" />
                                </div>
                                <div className="flex flex-col gap-1.5 md:col-span-2">
                                    <label className="text-[9px] font-black text-text-secondary uppercase tracking-widest ml-1">Fecha límite de entrega</label>
                                    <input value={newDoc.fecha_entrega} onChange={e => setNewDoc({ ...newDoc, fecha_entrega: e.target.value })} type="date" className="bg-surface border border-border-dark text-white rounded-lg px-3 py-2 text-xs outline-none focus:border-emerald-500/60 w-full" />
                                </div>
                            </div>
                            <div className="flex gap-3 justify-end">
                                <button onClick={() => { setAddDocMilestone(null); setNewDoc(emptyNewDoc); }} className="text-[11px] text-text-secondary border border-border-dark px-4 py-2.5 rounded-xl hover:border-slate-500 hover:text-white transition-colors font-bold uppercase tracking-widest">Cancelar</button>
                                <button onClick={() => { if (addDocMilestone !== null) handleAddDoc(addDocMilestone); }} disabled={!newDoc.nombre_documento.trim() || savingDoc} className="flex items-center gap-2 bg-emerald-500/15 hover:bg-emerald-500/25 disabled:opacity-50 disabled:cursor-not-allowed text-emerald-400 border border-emerald-500/30 px-5 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-colors">
                                    <span className="material-symbols-outlined text-[15px]">save</span> {savingDoc ? 'Guardando...' : 'Guardar documento'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de Notificaciones */}
            {showNotifications && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-background-dark/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <div className="bg-surface-dark border border-border-dark rounded-2xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">
                        <div className="px-6 py-5 border-b border-border-dark flex items-center justify-between bg-slate-800/20">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary text-[24px]">notifications_active</span>
                                <h2 className="text-[11px] font-black uppercase tracking-widest text-white">Manejo de Notificaciones</h2>
                            </div>
                            <button onClick={() => setShowNotifications(false)} className="text-text-secondary hover:text-white transition-colors bg-background-dark/50 p-1.5 rounded-lg border border-border-dark hover:border-slate-600">
                                <span className="material-symbols-outlined text-[18px]">close</span>
                            </button>
                        </div>
                        <div className="p-6">
                            <p className="text-xs text-text-secondary/80 mb-6 leading-relaxed font-medium">
                                Elige qué tipo de notificaciones deseas recibir para mantenerte al tanto del progreso y alertas de este proyecto.
                            </p>

                            <div className="space-y-4 mb-6 bg-background-dark/50 border border-border-dark p-5 rounded-xl">
                                <label className="flex items-start gap-4 cursor-pointer group">
                                    <input type="checkbox" className="mt-0.5 w-4 h-4 rounded border-slate-700 bg-slate-800 text-primary focus:ring-primary focus:ring-offset-background-dark" checked={notifAlertasVenc} onChange={e => setNotifAlertasVenc(e.target.checked)} />
                                    <div className="flex flex-col">
                                        <span className="text-[11px] font-black text-white group-hover:text-primary transition-colors uppercase tracking-widest">Alertas de Vencimiento</span>
                                        <span className="text-[10px] text-text-secondary mt-1 tracking-wide">Notificar días antes de que expire legalmente.</span>
                                    </div>
                                </label>
                                <label className="flex items-start gap-4 cursor-pointer group">
                                    <input type="checkbox" className="mt-0.5 w-4 h-4 rounded border-slate-700 bg-slate-800 text-primary focus:ring-primary focus:ring-offset-background-dark" checked={notifCambiosEstado} onChange={e => setNotifCambiosEstado(e.target.checked)} />
                                    <div className="flex flex-col">
                                        <span className="text-[11px] font-black text-white group-hover:text-primary transition-colors uppercase tracking-widest">Cambios de Estado</span>
                                        <span className="text-[10px] text-text-secondary mt-1 tracking-wide">Cuando un permiso es Aprobado o Rechazado.</span>
                                    </div>
                                </label>
                                <label className="flex items-start gap-4 cursor-pointer group">
                                    <input type="checkbox" className="mt-0.5 w-4 h-4 rounded border-slate-700 bg-slate-800 text-primary focus:ring-primary focus:ring-offset-background-dark" checked={notifResumenSemanal} onChange={e => setNotifResumenSemanal(e.target.checked)} />
                                    <div className="flex flex-col">
                                        <span className="text-[11px] font-black text-white group-hover:text-primary transition-colors uppercase tracking-widest">Resumen Semanal</span>
                                        <span className="text-[10px] text-text-secondary mt-1 tracking-wide">Un reporte todos los lunes con los avances.</span>
                                    </div>
                                </label>
                            </div>

                            <div>
                                <label className="block text-[10px] font-black text-text-secondary uppercase tracking-widest mb-2">Correo Electrónico</label>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-[18px]">mail</span>
                                    <input
                                        type="email"
                                        placeholder="ejemplo@goldfields.com"
                                        value={notifEmail}
                                        onChange={e => { setNotifEmail(e.target.value); setNotifMsg(null); }}
                                        className="w-full pl-10 pr-4 py-2.5 bg-background-dark border border-border-dark rounded-lg text-xs text-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-slate-600"
                                    />
                                </div>
                            </div>

                            {notifMsg && (
                                <div className={`mt-4 px-4 py-3 rounded-lg text-[11px] font-semibold flex items-center gap-2 ${notifMsg.ok ? 'bg-green-900/30 border border-green-700/40 text-green-400' : 'bg-red-900/30 border border-red-700/40 text-red-400'}`}>
                                    <span className="material-symbols-outlined text-[16px]">{notifMsg.ok ? 'check_circle' : 'error'}</span>
                                    {notifMsg.text}
                                </div>
                            )}
                        </div>
                        <div className="px-6 py-5 bg-slate-800/20 border-t border-border-dark flex justify-end gap-3">
                            <button onClick={() => { setShowNotifications(false); setNotifMsg(null); }} className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-text-secondary hover:text-white transition-colors">
                                Cancelar
                            </button>
                            <button
                                disabled={notifSending || !notifEmail.trim()}
                                onClick={async () => {
                                    setNotifSending(true);
                                    setNotifMsg(null);
                                    try {
                                        await sendNotificationEmail({
                                            correo: notifEmail,
                                            alertas_vencimiento: notifAlertasVenc,
                                            cambios_estado: notifCambiosEstado,
                                            resumen_semanal: notifResumenSemanal,
                                            project_name: projectName ?? '',
                                            permit_code: id ?? '',
                                        });
                                        setNotifMsg({ ok: true, text: 'Preferencias guardadas. Correo enviado correctamente.' });
                                    } catch (e: unknown) {
                                        setNotifMsg({ ok: false, text: e instanceof Error ? e.message : 'Error al enviar correo.' });
                                    } finally {
                                        setNotifSending(false);
                                    }
                                }}
                                className="px-6 py-2.5 text-[10px] font-black uppercase tracking-widest text-black bg-primary hover:bg-primary/90 rounded-xl shadow-sm transition-colors border border-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {notifSending ? 'Enviando...' : 'Guardar Preferencias'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectDashboard;
