import { createFileRoute, redirect } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import storage from "@/utils/storage";
import MaterialsService, {
  MaterialItem,
} from "@/services/materials/materials.service";

export const Route = createFileRoute("/library/$materialId")({
  beforeLoad: () => {
    const token = storage.getItem("token");
    if (!token) throw redirect({ to: "/login" });
  },
  component: ReviewMaterialPage,
});

function ReviewMaterialPage() {
  const { materialId } = Route.useParams();
  const [material, setMaterial] = useState<MaterialItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const list = await MaterialsService.list();
        const found = list.find((m) => m._id === materialId);
        setMaterial(found || null);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [materialId]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!material) {
    return (
      <div className="flex h-screen items-center justify-center">
        Không tìm thấy tài liệu
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <main className="flex flex-1 flex-col gap-4 p-6">
        <header>
          <h1 className="text-xl font-bold text-slate-900">
            {material.title || material.originalName}
          </h1>
        </header>

        <iframe
          src={material.fileUrl}
          title="PDF Review"
          className="h-full w-full rounded-xl border border-slate-200 bg-white"
        />
      </main>
    </div>
  );
}
