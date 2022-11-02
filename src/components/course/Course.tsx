import { ICourse } from "@trampo/models";
import Image from "next/image";
import { CSSProperties, forwardRef } from "react";

import { Button } from "../button";
import { Card } from "../card";
import { Icon, IconFontset, IconName } from "../icon";
import { SmartLink } from "../smart-link";
import { CourseAttribute } from "./CourseAttribute";

export const Course = forwardRef<HTMLDivElement, ICourse>(
  (
    { title, subtitle, description, img, schedule, registration, details },
    ref,
  ) => {
    const aspectRatio = img.width / img.height;
    const dateFormatter = new Intl.DateTimeFormat("fr-CA", {
      day: "numeric",
      month: "long",
    });

    return (
      <div ref={ref} className="course">
        <Card className="course__card">
          <figure
            className="course__figure"
            style={{ "--aspect-ratio": aspectRatio } as CSSProperties}>
            <Image
              src={img.src}
              alt={img.alt}
              layout={"fill"}
              objectFit={"cover"}
            />
          </figure>

          <div className="course__container course__container--rounded">
            {schedule && (
              <div className="course__schedule">
                <SmartLink href={schedule.href} ariaLabel="Consulter l'horaire">
                  <Icon
                    icon={IconName.Calendar}
                    fontset={IconFontset.Outlined}
                  />
                </SmartLink>
              </div>
            )}

            <h3 className="course__title">{title}</h3>
            {subtitle && <h4 className="course__subtitle">{subtitle}</h4>}
            <p className="course__description">{description}</p>
          </div>

          {details && (
            <div className="course__container">
              <CourseAttribute
                icon={{ name: IconName.Money, fontset: IconFontset.Outlined }}
                attribute={details.cost}
                formatAttribute={attr => `${attr.toString()}$`}
              />
              <CourseAttribute
                icon={{
                  name: IconName.Timespan,
                  fontset: IconFontset.Outlined,
                }}
                attribute={details.duration}
                formatAttribute={attr => `${attr}h`}
                suffix="par semaine"
              />
              <CourseAttribute
                icon={{
                  name: IconName.DateRange,
                  fontset: IconFontset.Outlined,
                }}
                attribute={details.timespan}
                formatAttribute={attr => dateFormatter.format(attr)}
                linkWord="au"
              />
            </div>
          )}

          {registration && (
            <div className="course__container">
              <Button
                className="course__link"
                disabled={!registration.isEnabled}
                tabIndex={registration.isEnabled ? 0 : -1}>
                {registration.isEnabled ? (
                  <SmartLink href={registration.href}>
                    {registration.cta ?? "S'inscrire en ligne"}
                  </SmartLink>
                ) : (
                  <>La période d&apos;inscription est terminée</>
                )}
              </Button>
            </div>
          )}
        </Card>
      </div>
    );
  },
);
