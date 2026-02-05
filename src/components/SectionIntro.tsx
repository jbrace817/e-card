import { FadeIn } from "./FadeIn";

function SectionIntro({
  heading = "Our Core Features",
  eyebrow = "Features",
  children,
  childrenClassName,
}: {
  heading: string;
  eyebrow: string;
  children?: React.ReactNode;
  childrenClassName?: string;
}) {
  return (
    <FadeIn>
      <div>
        <p className="text-primary mb-4 text-2xl leading-8 font-medium md:pl-5">
          {eyebrow}
        </p>
        <h2 className="mb-10 text-3xl leading-10 font-medium md:pl-5 lg:text-4xl">
          {heading}
        </h2>
        <p
          className={`card-muted mb-4 text-lg leading-7 md:pl-5 ${childrenClassName}`}
        >
          {children}
        </p>
      </div>
    </FadeIn>
  );
}

export default SectionIntro;
