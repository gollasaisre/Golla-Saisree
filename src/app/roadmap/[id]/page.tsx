import RoadmapClient from "./RoadmapClient";

export async function generateStaticParams() {
  return [
    { id: "1" },
    { id: "CSE" },
    { id: "IT" },
    { id: "CSM" },
    { id: "CSD" },
    { id: "ECE" },
    { id: "EEE" },
    { id: "MECHANICAL" },
    { id: "AUTOMOBILE" },
    { id: "CIVIL" },
  ];
}

export default async function RoadmapPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <RoadmapClient initialId={id} />;
}
