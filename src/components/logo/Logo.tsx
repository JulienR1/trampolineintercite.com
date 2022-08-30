import Image from "next/image";

interface IProps {
  width?: number;
  height?: number;
}

function Logo({ width = 100, height = 100 }: IProps) {
  return (
    <figure className="logo">
      <Image
        src={"/logo.svg"}
        alt="Logo Trampoline Intercité"
        objectFit={"contain"}
        layout={"fill"}
        priority
      />
    </figure>
  );
}

export { Logo };
