const form = (() => {
    const submitForm = (scene) => {
      const input = document.querySelector('#name');
      scene.sys.game.globals.username = input.value;
    };
  
    const createForm = (scene) => {
      const body = document.querySelector('body');
      const form = document.createElement('form');
      form.id = 'form';
      form.classList.add('form', 'hidden');
  
      const input = document.createElement('input');
      input.id = 'name';
      input.type = 'text';
      input.placeholder = 'Please Enter your Name';
      input.value = scene.sys.game.globals.username;
  
      const submit = document.createElement('input');
      submit.type = 'submit';
      submit.classList.add('hidden');
      submit.onclick = (e) => {
        e.preventDefault();
        submitForm(scene);
      };
  
      form.appendChild(input);
      form.appendChild(submit);
      body.appendChild(form);
    };
  
    const showForm = () => {
      const form = document.querySelector('form');
      form.classList.remove('hidden');
    };
  
    const removeForm = (scene) => {
      const form = document.querySelector('form');
      submitForm(scene);
      form.classList.add('hidden');
    };
  
    return { createForm, removeForm, showForm };
  })();
  
  export default form;
  