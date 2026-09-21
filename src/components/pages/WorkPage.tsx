import WorkIntro from "@/components/sections/work/WorkIntro";
import WorkOutro from "@/components/sections/work/WorkOutro";
import WorkBoard from "@/components/sections/work/WorkBoard";
import { spines } from "@/data/work";

export default function WorkPage() {
  return (
    <WorkBoard intro={<WorkIntro />} outro={<WorkOutro />} spines={spines} />
  );
}
