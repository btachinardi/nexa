export const abortControllers: Map<string, AbortController> = new Map();
export const getAbortController = (id?: string): AbortController => {
  if (!id) {
    id = "default";
  }

  let abortController = abortControllers.get(id);
  if (abortController) return abortController;

  abortController = new AbortController();
  abortControllers.set(id, abortController);
  return abortController;
};
