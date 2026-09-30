import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export function renderOgImage() {
    return new ImageResponse(
        (
            <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#0E1116", color: "#E8ECF1", padding: 80 }}>
                <div style={{ width: 96, height: 12, background: "#4D7CFF", display: "flex" }} />
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex", fontSize: 84, fontWeight: 700, lineHeight: 1.1 }}>{profile.name}</div>
                    <div style={{ display: "flex", maxWidth: 900, marginTop: 24, fontSize: 34, lineHeight: 1.4, color: "#9AA4B2" }}>{profile.role}</div>
                </div>
                <div style={{ display: "flex", fontSize: 28, color: "#9AA4B2" }}>{`${profile.location} · ${profile.university}`}</div>
            </div>
        ),
        { width: 1200, height: 630 }
    );
}