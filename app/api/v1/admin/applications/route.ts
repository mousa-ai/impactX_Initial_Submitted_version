import { errorResponse, json } from "@backend/api/http";
import { requireUser } from "@backend/auth/session";
import { store } from "@backend/db/store";

export async function GET(request: Request) {
  try {
    await requireUser(["reviewer", "manager"]);
    const { searchParams } = new URL(request.url);
    const details = await store.listAllApplications({
      statusKey: searchParams.get("statusKey") ?? undefined,
      typeId: searchParams.get("typeId") ?? undefined,
      query: searchParams.get("query") ?? undefined,
    });
    return json(
      await Promise.all(
        details.map(async (detail) => ({
          application: detail.application,
          type: detail.type,
          applicant: detail.applicant,
          status: detail.status,
          document_count: detail.documents.length,
          validated_count: detail.documents.filter((doc) => doc.validation_status === "success").length,
          flag_count: detail.flags.filter((flag) => !flag.resolved_at).length,
          recommendation: await store.recommendationFor(detail.application.id),
        })),
      ),
    );
  } catch (error) {
    return errorResponse(error);
  }
}
