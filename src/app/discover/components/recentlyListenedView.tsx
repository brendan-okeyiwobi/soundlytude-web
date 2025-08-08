// app/discover/components/recentlyListenedView.tsx

type Props = {
    title: string;
};

const RecentlyListenedView: React.FC<Props> = ({ title }) => {
    return (
        <div style={{ width: "100%" }}>
            <h2>{title}</h2>
        </div>
    );
};

export default RecentlyListenedView;
