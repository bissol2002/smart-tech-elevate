import { createServerFn } from "@tanstack/react-start";
import { loadCmsContent } from "./cms.server";

export const getCmsContent = createServerFn({ method: "GET" }).handler(async () => {
  return await loadCmsContent();
});
