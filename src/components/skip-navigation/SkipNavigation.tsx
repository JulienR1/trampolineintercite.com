interface IProps {
  skipTarget: string;
}

export function SkipNavigation({ skipTarget }: IProps) {
  return (
    <div className="skipNav">
      <a href={skipTarget} className="skipNav__link">
        Omettre la navigation
      </a>
    </div>
  );
}
