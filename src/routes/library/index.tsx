import { createFileRoute, redirect } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import storage from "@/utils/storage";
import Sidebar from "@/components/dashboard/layout/sidebar";
import { FileUp, FileText, Trash2, UploadCloud, Loader2 } from "lucide-react";
import MaterialsService from "@/services/materials/materials.service";
import { MaterialItem } from "@/services/materials/materials.service";
import { useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/library/")({
  beforeLoad: () => {
    const token = storage.getItem("token");
    if (!token) throw redirect({ to: "/login" });
  },
  component: LibraryRoute,
});

function formatBytes(bytes: number) {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const value = bytes / Math.pow(k, i);
  return `${value.toFixed(value >= 10 || i === 0 ? 0 : 1)} ${sizes[i]}`;
}

function LibraryRoute() {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialItem | null>(
    null,
  );

  const [error, setError] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);
  const [isLoadingList, setIsLoadingList] = useState(true);
  const [materials, setMaterials] = useState<MaterialItem[]>([]);

  const onPick = () => inputRef.current?.click();

  const validatePdf = (file: File) => {
    if (file.type !== "application/pdf") {
      setError("Vui lòng chọn đúng file PDF (application/pdf).");
      return false;
    }
    const maxBytes = 25 * 1024 * 1024;
    if (file.size > maxBytes) {
      setError("File quá lớn. Vui lòng chọn file <= 25MB.");
      return false;
    }
    return true;
  };

  const chooseLocalFile = (file: File | null | undefined) => {
    setError("");
    if (!file) return;
    if (!validatePdf(file)) return;

    setSelectedFile(file);
    setSelectedMaterial(null); // chọn file local thì bỏ preview server
  };

  const removeSelection = () => {
    setSelectedFile(null);
    setSelectedMaterial(null);
    setError("");
    if (inputRef.current) inputRef.current.value = "";
  };

  const loadList = async () => {
    setIsLoadingList(true);
    try {
      const data = await MaterialsService.list();
      setMaterials(data);
    } catch (e) {
      console.error(e);
      setError("Không tải được danh sách tài liệu. Kiểm tra BE / token.");
    } finally {
      setIsLoadingList(false);
    }
  };

  useEffect(() => {
    loadList();
  }, []);

  const fileMeta = useMemo(() => {
    if (!selectedFile) return null;
    return { name: selectedFile.name, size: formatBytes(selectedFile.size) };
  }, [selectedFile]);

  const uploadToServer = async () => {
    setError("");
    if (!selectedFile) {
      setError("Bạn chưa chọn file PDF để upload.");
      return;
    }
    if (!validatePdf(selectedFile)) return;

    setIsUploading(true);
    try {
      const created = await MaterialsService.upload(
        selectedFile,
        selectedFile.name,
      );
      await loadList();
      setSelectedMaterial(created);
      setSelectedFile(null);
      if (inputRef.current) inputRef.current.value = "";
    } catch {
      console.error("Loi upload");
      setError("Upload thất bại. Kiểm tra API / quyền TEACHER.");
    } finally {
      setIsUploading(false);
    }
  };

  const navigate = useNavigate();

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-b from-indigo-50/60 via-slate-50 to-slate-50 font-sans text-slate-800">
      <Sidebar />

      <main className="relative flex flex-1 overflow-hidden">
        <div className="pointer-events-none absolute left-0 top-0 h-64 w-full bg-gradient-to-b from-indigo-50/50 to-transparent" />

        <div className="flex flex-1 flex-col gap-6 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-slate-200 lg:p-10">
          {/* Header */}
          <header className="relative z-10 flex flex-col gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Library (Upload & Share PDF)
            </h1>
            <p className="text-sm font-medium text-slate-500">
              Giáo viên upload lên server
            </p>
          </header>

          {/* Upload card */}
          <section className="relative z-10">
            <div className="rounded-3xl border border-slate-200 bg-white/70 p-5 shadow-sm backdrop-blur">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-start gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-indigo-50 text-primary">
                    <UploadCloud className="h-5 w-5" />
                  </div>

                  <div className="space-y-1">
                    <div className="text-base font-semibold text-slate-900">
                      Upload PDF lên server
                    </div>
                    <div className="text-sm font-medium text-slate-500">
                      Kéo-thả PDF vào khung hoặc bấm nút chọn file.
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
                  <input
                    ref={inputRef}
                    type="file"
                    accept="application/pdf"
                    className="hidden"
                    onChange={(e) => chooseLocalFile(e.target.files?.[0])}
                  />

                  <button
                    type="button"
                    onClick={onPick}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:shadow-md active:scale-[0.99]"
                  >
                    <FileUp className="h-4 w-4" />
                    Choose PDF
                  </button>

                  <button
                    type="button"
                    onClick={uploadToServer}
                    disabled={!selectedFile || isUploading}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isUploading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <UploadCloud className="h-4 w-4" />
                    )}
                    Upload
                  </button>

                  <button
                    type="button"
                    onClick={removeSelection}
                    disabled={!selectedFile && !selectedMaterial}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Trash2 className="h-4 w-4" />
                    Clear
                  </button>
                </div>
              </div>

              {/* Dropzone */}
              <div
                className={[
                  "mt-4 rounded-3xl border-2 border-dashed p-6 transition-all",
                  isDragging
                    ? "border-indigo-300 bg-indigo-50/60"
                    : "border-slate-200 bg-white",
                ].join(" ")}
                onDragEnter={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsDragging(true);
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsDragging(true);
                }}
                onDragLeave={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsDragging(false);
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsDragging(false);
                  const file = e.dataTransfer.files?.[0];
                  chooseLocalFile(file);
                }}
              >
                <div className="flex flex-col items-center justify-center gap-3 text-center">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-slate-50 text-slate-700">
                    <FileText className="h-5 w-5" />
                  </div>

                  <div className="space-y-1">
                    <div className="text-sm font-semibold text-slate-900">
                      Drag & drop PDF here
                    </div>
                    <div className="text-xs font-medium text-slate-500">
                      Hỗ trợ PDF, tối đa 25MB.
                    </div>
                  </div>

                  {error ? (
                    <div className="mt-2 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700">
                      {error}
                    </div>
                  ) : null}

                  {fileMeta ? (
                    <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
                      <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                        Ready to upload
                      </span>
                      <span className="text-sm font-semibold text-slate-700">
                        {fileMeta.name}
                      </span>
                      <span className="text-sm font-semibold text-slate-400">
                        • {fileMeta.size}
                      </span>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={onPick}
                      className="mt-2 inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50"
                    >
                      Or select a file
                    </button>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Library list + Preview */}
          <section className="relative z-10">
            {/* List */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl border border-slate-200 bg-white/70 shadow-sm backdrop-blur">
                <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                  <div>
                    <div className="text-sm font-bold text-slate-900">
                      Documents
                    </div>
                    <div className="text-xs font-medium text-slate-500">
                      Danh sách tài liệu (mọi user đều thấy).
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={loadList}
                    className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 shadow-sm transition-all hover:bg-slate-50"
                  >
                    Refresh
                  </button>
                </div>

                <div className="p-4">
                  {isLoadingList ? (
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-600">
                      <Loader2 className="h-4 w-4 animate-spin" /> Loading...
                    </div>
                  ) : materials.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-6 text-center">
                      <div className="text-sm font-semibold text-slate-700">
                        Chưa có tài liệu
                      </div>
                      <div className="text-xs font-medium text-slate-500">
                        Giáo viên upload để mọi người thấy ở đây.
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {materials.map((m) => (
                        <button
                          key={m._id}
                          type="button"
                          onClick={() =>
                            navigate({
                              to: "/library/$materialId",
                              params: { materialId: m._id },
                            })
                          }
                          className={[
                            "w-full rounded-2xl border px-4 py-3 text-left shadow-sm transition-all",
                            selectedMaterial?._id === m._id
                              ? "border-indigo-200 bg-indigo-50/60"
                              : "border-slate-200 bg-white hover:bg-slate-50",
                          ].join(" ")}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <div className="truncate text-sm font-bold text-slate-900">
                                {m.title || m.originalName}
                              </div>
                              <div className="mt-1 text-xs font-medium text-slate-500">
                                {formatBytes(m.size)} •{" "}
                                {new Date(m.createdAt).toLocaleString()}
                              </div>
                            </div>
                            <div className="grid h-9 w-9 place-items-center rounded-2xl bg-slate-50 text-slate-700">
                              <FileText className="h-4 w-4" />
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
