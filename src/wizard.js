import zenscroll from "zenscroll";
export const wizard = (steps) => {

  steps.forEach(step => {
    const totalSteps = steps.length;
    const stepType = step.dataset.stepType;
    const inputType = step.dataset.inputType;

    if (inputType === 'select') {
      const input = step.querySelector('select');

      input.addEventListener("change", function (e) {

        // More steps to come, open next
        if (step.dataset.step < totalSteps - 1) {
          const nextStep = steps[step.dataset.step];
          const nextStepCollapsible = nextStep.querySelector('.b-collapsible');
          const nextStepTrigger = nextStep.querySelector('button');
          if (!nextStepCollapsible.classList.contains('b-collapsible--active')) {
            nextStepTrigger.click();
          }
        }

        // The last step before results, show results
        if (step.dataset.step == (totalSteps - 1)) {
          const nextStep = steps[step.dataset.step];
          nextStep.classList.remove('hide');
          setTimeout(() => {
            zenscroll.to(nextStep);
            submit.innerHTML = "Oppdater resultat";
          }, 100);
        }
      });
    }

    if (inputType === 'checkboxes') {
      const submit = step.querySelector('button[data-submit]');
      
      submit.addEventListener("click", function (e) {

        // More steps to come, open next
        if (step.dataset.step < totalSteps - 1) {
          const nextStep = steps[step.dataset.step];
          const nextStepCollapsible = nextStep.querySelector('.b-collapsible');
          const nextStepTrigger = nextStep.querySelector('button');
          if (!nextStepCollapsible.classList.contains('b-collapsible--active')) {
            nextStepTrigger.click();
          }
        }

        // The last step before results, show results
        if (step.dataset.step == (totalSteps - 1)) {
          const nextStep = steps[step.dataset.step];
          nextStep.classList.remove('hide');
          setTimeout(() => {
            zenscroll.to(nextStep);
            submit.innerHTML = "Oppdater resultat";
          }, 100);
        }
      });

    }

    // Initially, hide results
    if (stepType === 'result') {
      step.classList.add('hide');
    }
  });
};