// Cloudflare Pages Serverless Edge Function for Photo Uploads
export interface Env {}

export const onRequestPost = async (context: { request: Request; env: Env }) => {
  try {
    const contentType = context.request.headers.get("content-type") || "";
    let imageUrl = "";

    if (contentType.includes("application/json")) {
      const body = (await context.request.json()) as { image?: string; photoUrl?: string };
      imageUrl = body.image || body.photoUrl || "";
    } else if (contentType.includes("multipart/form-data") || contentType.includes("application/x-www-form-urlencoded")) {
      const formData = await context.request.formData();
      const file = formData.get("file");
      if (file && typeof file === "object") {
        const blob = file as Blob;
        const buffer = await blob.arrayBuffer();
        const bytes = new Uint8Array(buffer);
        let binary = "";
        for (let i = 0; i < bytes.byteLength; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        const base64 = btoa(binary);
        imageUrl = `data:${blob.type || "image/jpeg"};base64,${base64}`;
      }
    }

    if (!imageUrl) {
      return new Response(JSON.stringify({ success: false, error: "No image payload found" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({
        success: true,
        url: imageUrl,
        savedToCloudflare: true,
        timestamp: new Date().toISOString(),
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({
        success: false,
        error: err.message || "Failed to process photo upload on Cloudflare",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};

export const onRequestOptions = async () => {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
};
