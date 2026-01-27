export const baseURL = "/web--kl-poly-data";

export default function staticify(url: string) {
  return `${baseURL}${url.startsWith("/") ? "" : "/"}${url}`;
}
