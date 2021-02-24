export const wizard = (steps) => {
  // const resultsApp = document.getElementById('grants-search');

  steps.forEach(step => {
    const totalSteps = steps.length;
    const stepType = step.dataset.stepType;
    const inputType = step.dataset.inputType;

    if (inputType === 'select') {
      const input = step.querySelector('select');

      input.onchange = (e) => {

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
        }
      };
    }

    if (inputType === 'checkboxes') {
      const inputs = step.querySelectorAll('input[type="checkbox"]');
      inputs.forEach(input => {
        
        input.onchange = () => {

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
          }
        };
      });

    }

    // Initially, hide results
    if (stepType === 'result') {
      step.classList.add('hide');
    }
  });
};