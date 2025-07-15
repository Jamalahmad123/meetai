import Image from "next/image";


interface Props {
  title: string;
  description?: string;
  imgSrc?: string;
}

export const EmptyState = ({
  title,
  description = "No Results",
  imgSrc = "/empty.svg"
}: Props) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Image src={imgSrc} alt="Empty Banner" priority width={220} height={220} style={{ width: 220, height: 220 }} />
      <div className="flex flex-col gap-y-3 max-w-md mx-auto text-center">
        <h6 className="text-lg font-medium">{title}</h6>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};
