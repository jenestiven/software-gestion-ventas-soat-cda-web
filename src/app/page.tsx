import PageCarousel from "@/app/components/page/PageCarousel";
import PageHeader from "@/app/components/page/PageHeader";
import HERO_ONE from "@/images/GP__40.jpg"
import HERO_TWO from "@/images/GP__45.webp"
import HERO_TREE from "@/images/GP__2.webp"
import HERO_FOUR from "@/images/GP__8.webp"
import HERO_FIVE from "@/images/GP__7.webp"

const carouselItems = [
  { src: HERO_ONE.src, alt: "CDA Moto Gp Team" },
  { src: HERO_TWO.src, alt: "CDA Moto Gp Team" },
  { src: HERO_TREE.src, alt: "CDA Moto Gp Team" },
  { src: HERO_FOUR.src, alt: "CDA Moto Gp Team" },
  { src: HERO_FIVE.src, alt: "CDA Moto Gp Team" },
];

export default function WebHomePage() {
  return (
    <main className="flex flex-col items-center justify-start min-h-screen">
      <PageHeader />
      <PageCarousel items={carouselItems} />
    </main>
  );
}
