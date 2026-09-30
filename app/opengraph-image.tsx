import { renderOgImage } from "@/lib/og-image";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Muhammad Musawar Ali Shah portfolio";

export default function OpengraphImage() {
    return renderOgImage();
}