import { Button, Modal, Title } from "@mantine/core";
import { FormConfirmation, FormRef } from "@trampo/ui/form";
import { useRef, useState } from "react";
import { adminRoute } from "../../__root";
import { PartnerForm } from "./components";

export const Partners = () => {
  const formRef = useRef<FormRef>(null);
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <Modal
        opened={showForm}
        onClose={() => formRef.current?.reset()}
        title={<Title size="h3">Ajouter un partenaire</Title>}>
        <FormConfirmation
          ref={formRef}
          form={PartnerForm}
          onSubmit={data => console.log(data)}
          onReset={() => setShowForm(false)}
        />
      </Modal>

      <Button onClick={() => setShowForm(true)}>create partner</Button>
    </>
  );
};

export const partnersRoute = adminRoute.createRoute({
  path: "partners",
  component: Partners,
});
