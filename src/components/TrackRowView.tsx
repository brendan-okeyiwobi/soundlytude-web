// components/TrackRowView.tsx

import { HStack } from "./stack-layout";
import { TrackSingle } from "@/types/trackSingle";

type TrackRowProps = Pick<TrackSingle, '_id' | 'trackNumber' | 'title' | 'explicit' | 'streamsCount'>;

const TrackRowView = (props: TrackRowProps) => {
    const {
        trackNumber,
        title,
        explicit,
        streamsCount
    } = props;

    return (
        <HStack
        className="TRV-row"
            align='center'
            justify='space-between'
            style={{
                padding: "12px 20px",
                borderBottom: "0.5px solid rgba(128, 128, 128, 0.5)",
                width: "100%",
                boxSizing: "border-box",
            }}
        >
            {/* Left: Track number and title */}
            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                <p style={{ margin: 0, opacity: 0.75, width: "20px", textAlign: "right" }}>{trackNumber}</p>
                <div style={{ display: "flex", gap: "5px", alignItems: "flex-start" }}>
                    <p style={{ margin: 0 }}>{title}</p>
                    {explicit && <p style={{ margin: 0, fontSize: "1.1rem", color: "#888" }}>🅴</p>}</div>
            </div>

            {/* Right: Streams count */}
            <p style={{
                margin: 0,
                width: "50px",
                textAlign: "left",
                wordSpacing: "7.5px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis"
            }}>
                ▷ {streamsCount.toString()}
            </p>
            <style>{`
        .TRV-row:hover {
          background-color: #7099ff20;
        }
      `}</style>
        </HStack>
    );
};


export default TrackRowView