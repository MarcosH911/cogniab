import { type Dispatch, type SetStateAction, useCallback } from "react";
import HighlightDialog, {
  type PlacementType,
} from "@/components/HighlightDialog";
import GameTutorialTooltip from "./GameTutorialTooltip";
import { revalidatePath } from "next/cache";

export type StepType = {
  title: React.ReactNode;
  content: React.ReactNode;
  target: string;
  placement: PlacementType;
  hideBackButton?: boolean;
  hidePrimaryButton?: boolean;
  primaryButtonText?: string;
  elementClickable?: boolean;
};

interface GameTutorialStepsProps {
  steps: StepType[];
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  isVisible: boolean;
  showSkipButton: boolean;
}

export default function GameTutorialSteps({
  steps,
  step,
  setStep,
  isVisible,
  showSkipButton,
}: GameTutorialStepsProps) {
  const handleSkip = useCallback(async () => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_URL + "/user/update-user",
      {
        method: "POST",
        body: JSON.stringify({ hasFinishedTutorial: true }),
      },
    );

    if (!response.ok) {
      return <div>An error has ocurred</div>;
    }

    revalidatePath("/app/play");
  }, []);

  const currentStep = steps[step - Number(step >= steps.length)];
  return (
    <HighlightDialog
      isOpen={step >= steps.length ? false : isVisible}
      placement={currentStep.placement}
      elementClickable={currentStep.elementClickable}
      targetElement={currentStep.target}
    >
      <GameTutorialTooltip
        title={currentStep.title}
        content={currentStep.content}
        showSkipButton={showSkipButton && step === 0}
        hideBackButton={currentStep.hideBackButton}
        hidePrimaryButton={currentStep.hidePrimaryButton}
        primaryButtonText={currentStep.primaryButtonText}
        handlePrimaryButtonClick={() => setStep((prevStep) => prevStep + 1)}
        handleBackButtonClick={() => setStep((prevStep) => prevStep - 1)}
        handleSkipButtonClick={handleSkip}
      />
    </HighlightDialog>
  );
}
