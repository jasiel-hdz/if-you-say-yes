import { Letter } from "@/components/Letter/Letter";
import { letter } from "@/lib/letter";

export default function Home() {
  return <Letter data={letter} />;
}
