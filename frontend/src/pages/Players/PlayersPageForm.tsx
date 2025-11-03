"use client";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import type { Players as PlayerType } from "../../types/players.types";
import { getPlayerDetails } from "../../routes/playersmockdata";
import "./playerspageform.css";
import TextField from "../../components/Form/Fields/TextField";
import DateField from "../../components/Form/Fields/DateField";

type Props = {
  selectedId?: string | null;
  onSave?: (player: PlayerType) => void;
  onClearSelection?: () => void;
};

export default function PlayersPageForm({
  selectedId,
  onSave,
  onClearSelection,
}: Props) {
  const methods = useForm<PlayerType>({
    defaultValues: {
      id: "",
      firstName: "",
      middleName: "",
      preferredName: "",
      lastName: "",
      nationality: "",
      dateOfBirth: "",
      identificationNumber: "",
      age: 0,
      gender: "",
      contact: "",
      email: "",
      status: "",
    } as PlayerType,
  });
  const { handleSubmit, reset, formState } = methods;

  useEffect(() => {
    if (!selectedId) {
      reset();
      return;
    }
    const details = getPlayerDetails(selectedId);
    if (details) {
      reset(details);
    }
  }, [selectedId, reset]);

  function onSubmit(data: PlayerType) {
    onSave?.(data);
    // Optionally clear selection after save:
    onClearSelection?.();
  }

  return (
    <FormProvider {...methods}>
      <div
        className="cardBase_playersPageForm "
        onSubmit={handleSubmit(onSubmit)}
        aria-labelledby="player-form"
      >
        <div className="cardBase_playersPageForm-header">
          <div
            id="player-form-title"
            className="cardBase_playersPageForm-header-title"
          >
            {selectedId
              ? `${methods.getValues("firstName")}, ${methods.getValues(
                  "lastName"
                )}`
              : "No player selected"}
          </div>
          <div className="accentLine_playersPageForm" aria-hidden />
        </div>

        <form className="cardBase_playersPageForm-body">
          <div className="formColumn_playersPageForm">
            <div>
              <TextField name="firstName" label="First name" />
              <TextField name="middleName" label="Middle name" />
              <TextField name="lastName" label="Last name" />
              <TextField name="preferredName" label="Preferred name" />
              <TextField name="gender" label="Gender" />
              <DateField name="dateOfBirth" label="Date of birth" />
            </div>
            <div>
              <TextField name="identificationNumber" label="ID / Passport" />
              <TextField name="age" label="Age" />
              <TextField name="nationality" label="Nationality" />
              <TextField name="contact" label="Contact" />
              <TextField name="email" label="Email" />
              <TextField name="status" label="Status" />
            </div>
          </div>
          <div className="formColumn_playersPageForm"></div>
        </form>

        <div className="cardBase_playersPageForm-footer">
          <div className="cardBase_playersPageForm-footerActions">
            <button
              type="button"
              className="button-secondary button-lg buttonSecondary_playersPageForm"
              onClick={() => {
                reset();
                onClearSelection?.();
              }}
            >
              Clear
            </button>
            <button
              type="submit"
              className="button-primary button-lg buttonPrimary_playersPageForm"
              disabled={formState.isSubmitting}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </FormProvider>
  );
}
