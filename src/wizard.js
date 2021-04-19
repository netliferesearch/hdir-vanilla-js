import zenscroll from "zenscroll";
export const wizard = (steps) => {

  const openNext = (step) => {
    const nextStep = steps[step.dataset.step];
    const nextStepCollapsible = nextStep.querySelector('.b-collapsible');
    const nextStepTrigger = nextStep.querySelector('button');
    if (!nextStepCollapsible.classList.contains('b-collapsible--active')) {
      nextStepTrigger.click();
    }
  };

  const showResults = (step) => {
    const nextStep = steps[step.dataset.step];
    const submit = step.querySelector('button[data-submit]');
    nextStep.classList.remove('hide');
    setTimeout(() => {
      zenscroll.to(nextStep);
      if (submit) {
        submit.innerHTML = "Oppdater resultat";
      }
    }, 100);
  };

  steps.forEach(step => {
    const totalSteps = steps.length;
    const stepType = step.dataset.stepType;
    const inputType = step.dataset.inputType;
    const nextStepTrigger = step.querySelector('button[data-next]');

    // Last step, change label on next btn
    if (step.dataset.step == (totalSteps - 1)) {
      nextStepTrigger.innerHTML = 'Vis resultater';
    }

    if (inputType === 'dropValue') {

      nextStepTrigger.addEventListener("click", function (e) {

        // More steps to come, open next
        if (step.dataset.step < totalSteps - 1) {
          openNext(step);
        }

        // The last step before results, show results
        if (step.dataset.step == (totalSteps - 1)) {
          showResults(step);
        }
      });
    }

    if (inputType === 'checkValue') {
      nextStepTrigger.addEventListener("click", function (e) {

        // More steps to come, open next
        if (step.dataset.step < totalSteps - 1) {
          openNext(step);
        }

        // The last step before results, show results
        if (step.dataset.step == (totalSteps - 1)) {
          showResults(step);
        }
      });

    }

    if (inputType === 'radioValue') {
      nextStepTrigger.addEventListener("click", function (e) {

        // More steps to come, open next
        if (step.dataset.step < totalSteps - 1) {
          openNext(step);
        }

        // The last step before results, show results
        if (step.dataset.step == (totalSteps - 1)) {
          showResults(step);
        }
      });

    }

    // Initially, hide results
    if (stepType === 'result') {
      step.classList.add('hide');
    }
  });
};