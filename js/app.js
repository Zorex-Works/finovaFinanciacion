/* =========================================================
   FINOVA
   APP.JS

   JavaScript compartido por:

   - solicitud.html
   - contacto.html
   - Otros formularios de Finova

   OBJETIVOS:
   - Validar formularios
   - Mostrar mensajes de error
   - Mostrar mensajes de éxito
   - Evitar recargas innecesarias
   - Limpiar errores al modificar campos
   - Preparar los datos para futura conexión
     con un backend
   ========================================================= */


/* =========================================================
   01. FUNCIONES GENERALES DE MENSAJES
   ========================================================= */


/**
 * Muestra un mensaje general dentro de un formulario.
 *
 * type:
 * - "success" → envío correcto
 * - "error"   → falta información o existe un error
 */
function showFormMessage(form, message, type) {

    const formMessage =
        form.querySelector(".form-message");

    /*
       Si el formulario no tiene un elemento
       .form-message, no hacemos nada.
    */
    if (!formMessage) {
        return;
    }


    /* Colocamos el texto del mensaje */
    formMessage.textContent = message;


    /*
       Reiniciamos las clases anteriores
       para evitar conflictos.
    */
    formMessage.className = "form-message";


    /* Mensaje de éxito */
    if (type === "success") {

        formMessage.classList.add("success");

    }


    /* Mensaje de error */
    if (type === "error") {

        formMessage.classList.add("error");

    }


    /*
       Desplazamos suavemente la pantalla
       hasta el mensaje.
    */
    formMessage.scrollIntoView({

        behavior: "smooth",

        block: "center"

    });

}


/**
 * Oculta el mensaje general del formulario.
 */
function clearFormMessage(form) {

    const formMessage =
        form.querySelector(".form-message");


    /*
       Si el formulario no tiene mensaje,
       no hacemos nada.
    */
    if (!formMessage) {
        return;
    }


    /* Eliminamos el contenido */
    formMessage.textContent = "";


    /* Restauramos la clase original */
    formMessage.className = "form-message";

}


/* =========================================================
   02. FORMULARIO DE SOLICITUD
   solicitud.html
   ========================================================= */


/*
   Buscamos el formulario principal
   de solicitud de financiación.
*/
const applicationForm =
    document.getElementById("applicationForm");


/*
   Esta sección solamente se ejecuta
   si estamos en solicitud.html.
*/
if (applicationForm) {


    /* =====================================================
       02.1 ELEMENTOS DEL FORMULARIO
       ===================================================== */


    const nameInput =
        document.getElementById("name");


    const documentInput =
        document.getElementById("document");


    const emailInput =
        document.getElementById("email");


    const phoneInput =
        document.getElementById("phone");


    const typeInput =
        document.getElementById("type");


    const amountInput =
        document.getElementById("amount");


    const termInput =
        document.getElementById("term");


    const destinationInput =
        document.getElementById("destination");


    const messageInput =
        document.getElementById("message");


    /* =====================================================
       02.2 FUNCIONES DE ERROR POR CAMPO
       ===================================================== */


    /**
     * Muestra un mensaje de error
     * debajo de un campo específico.
     */
    function showError(input, message) {

        /*
           Si el campo no existe,
           detenemos la función.
        */
        if (!input) {
            return;
        }


        /*
           Buscamos el contenedor
           .input-group correspondiente.
        */
        const group =
            input.closest(".input-group");


        if (!group) {
            return;
        }


        /*
           Primero eliminamos cualquier
           error anterior.
        */
        removeError(input);


        /*
           Creamos el elemento
           donde aparecerá el error.
        */
        const error =
            document.createElement("span");


        error.className =
            "input-error";


        error.textContent =
            message;


        /*
           Insertamos el mensaje
           debajo del campo.
        */
        group.appendChild(error);


        /*
           Marcamos visualmente el campo
           que contiene el error.
        */
        input.classList.add(
            "input-error-field"
        );

    }


    /**
     * Elimina el error de un campo.
     */
    function removeError(input) {

        if (!input) {
            return;
        }


        const group =
            input.closest(".input-group");


        if (!group) {
            return;
        }


        /*
           Buscamos el mensaje de error
           existente dentro del grupo.
        */
        const existingError =
            group.querySelector(".input-error");


        /*
           Si existe, lo eliminamos.
        */
        if (existingError) {

            existingError.remove();

        }


        /*
           Quitamos la clase visual
           de error del campo.
        */
        input.classList.remove(
            "input-error-field"
        );

    }


    /**
     * Elimina todos los errores
     * existentes en el formulario.
     */
    function clearErrors() {


        /* Buscamos todos los mensajes */
        const errors =
            applicationForm.querySelectorAll(
                ".input-error"
            );


        /* Los eliminamos */
        errors.forEach(error => {

            error.remove();

        });


        /*
           Buscamos todos los campos
           marcados con error.
        */
        const fields =
            applicationForm.querySelectorAll(
                ".input-error-field"
            );


        /* Quitamos la clase de error */
        fields.forEach(field => {

            field.classList.remove(
                "input-error-field"
            );

        });

    }


    /* =====================================================
       02.3 VALIDACIÓN DEL NOMBRE
       ===================================================== */


    function validateName() {

        const value =
            nameInput.value.trim();


        /* Campo vacío */
        if (value === "") {

            showError(
                nameInput,
                "Ingresa tu nombre completo."
            );

            return false;

        }


        /* Nombre demasiado corto */
        if (value.length < 3) {

            showError(
                nameInput,
                "El nombre debe tener al menos 3 caracteres."
            );

            return false;

        }


        return true;

    }


    /* =====================================================
       02.4 VALIDACIÓN DEL DOCUMENTO
       ===================================================== */


    function validateDocument() {

        const value =
            documentInput.value.trim();


        /* Campo vacío */
        if (value === "") {

            showError(
                documentInput,
                "Ingresa tu documento de identidad."
            );

            return false;

        }


        /* Documento demasiado corto */
        if (value.length < 5) {

            showError(
                documentInput,
                "Ingresa un documento válido."
            );

            return false;

        }


        return true;

    }


    /* =====================================================
       02.5 VALIDACIÓN DEL CORREO
       ===================================================== */


    function validateEmail() {

        const value =
            emailInput.value.trim();


        /* Campo vacío */
        if (value === "") {

            showError(
                emailInput,
                "Ingresa tu correo electrónico."
            );

            return false;

        }


        /*
           Expresión básica para comprobar
           que el correo tenga una estructura válida.
        */
        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        /*
           Comprobamos el correo
           utilizando la expresión anterior.
        */
        if (!emailPattern.test(value)) {

            showError(
                emailInput,
                "Ingresa un correo electrónico válido."
            );

            return false;

        }


        return true;

    }


    /* =====================================================
       02.6 VALIDACIÓN DEL TELÉFONO
       ===================================================== */


    function validatePhone() {

        const value =
            phoneInput.value.trim();


        /* Campo vacío */
        if (value === "") {

            showError(
                phoneInput,
                "Ingresa tu número de teléfono."
            );

            return false;

        }


        /*
           Eliminamos cualquier carácter
           que no sea un número.
        */
        const numbersOnly =
            value.replace(/\D/g, "");


        /*
           Comprobamos que existan
           al menos 7 números.
        */
        if (numbersOnly.length < 7) {

            showError(
                phoneInput,
                "Ingresa un número de teléfono válido."
            );

            return false;

        }


        return true;

    }


    /* =====================================================
       02.7 VALIDACIÓN DEL TIPO DE FINANCIACIÓN
       ===================================================== */


    function validateType() {

        if (typeInput.value === "") {

            showError(
                typeInput,
                "Selecciona el tipo de financiación."
            );

            return false;

        }


        return true;

    }


    /* =====================================================
       02.8 VALIDACIÓN DEL MONTO
       ===================================================== */


    function validateAmount() {

        const value =
            Number(amountInput.value);


        /*
           Comprobamos si el campo
           está vacío.
        */
        if (!amountInput.value) {

            showError(
                amountInput,
                "Ingresa el monto que deseas solicitar."
            );

            return false;

        }


        /*
           El monto debe ser mayor
           que cero.
        */
        if (value <= 0) {

            showError(
                amountInput,
                "El monto debe ser mayor que cero."
            );

            return false;

        }


        return true;

    }


    /* =====================================================
       02.9 VALIDACIÓN DEL PLAZO
       ===================================================== */


    function validateTerm() {

        if (termInput.value === "") {

            showError(
                termInput,
                "Selecciona el plazo de financiación."
            );

            return false;

        }


        return true;

    }


    /* =====================================================
       02.10 VALIDACIÓN DEL DESTINO
       ===================================================== */


    function validateDestination() {

        if (destinationInput.value === "") {

            showError(
                destinationInput,
                "Selecciona el destino de la financiación."
            );

            return false;

        }


        return true;

    }


    /* =====================================================
       02.11 VALIDACIÓN GENERAL
       ===================================================== */


    function validateApplicationForm() {


        /*
           Eliminamos errores anteriores
           antes de comenzar una nueva validación.
        */
        clearErrors();


        /*
           Inicialmente asumimos
           que el formulario es válido.
        */
        let valid = true;


        /*
           Validamos cada campo
           individualmente.
        */

        if (!validateName()) {

            valid = false;

        }


        if (!validateDocument()) {

            valid = false;

        }


        if (!validateEmail()) {

            valid = false;

        }


        if (!validatePhone()) {

            valid = false;

        }


        if (!validateType()) {

            valid = false;

        }


        if (!validateAmount()) {

            valid = false;

        }


        if (!validateTerm()) {

            valid = false;

        }


        if (!validateDestination()) {

            valid = false;

        }


        return valid;

    }


    /* =====================================================
       02.12 CONTROL DEL MONTO
       ===================================================== */


    if (amountInput) {

        amountInput.addEventListener(
            "input",
            function () {

                /*
                   Evita valores negativos.
                */
                if (Number(this.value) < 0) {

                    this.value = 0;

                }

            }
        );

    }


    /* =====================================================
       02.13 LIMPIAR ERROR AL MODIFICAR CAMPOS
       ===================================================== */


    const fields =
        applicationForm.querySelectorAll(
            "input, select, textarea"
        );


    fields.forEach(field => {


        /*
           Cuando el usuario escribe,
           eliminamos el error de ese campo.
        */
        field.addEventListener(
            "input",
            function () {

                removeError(this);

                clearFormMessage(
                    applicationForm
                );

            }
        );


        /*
           Cuando el usuario cambia
           un select u otro campo.
        */
        field.addEventListener(
            "change",
            function () {

                removeError(this);

                clearFormMessage(
                    applicationForm
                );

            }
        );

    });


    /* =====================================================
       02.14 ENVÍO DEL FORMULARIO
       ===================================================== */


    applicationForm.addEventListener(
        "submit",
        function (event) {


            /*
               Evitamos que el navegador
               recargue la página.
            */
            event.preventDefault();


            /*
               Limpiamos mensajes anteriores.
            */
            clearFormMessage(
                applicationForm
            );


            /*
               Ejecutamos la validación
               completa del formulario.
            */
            const isValid =
                validateApplicationForm();


            /* =================================================
               FORMULARIO CON ERRORES
               ================================================= */


            if (!isValid) {


                /*
                   Mostramos un mensaje general
                   indicando que existen errores.
                */
                showFormMessage(
                    applicationForm,
                    "⚠️ Por favor, revisa los campos indicados antes de enviar la solicitud.",
                    "error"
                );


                /*
                   Buscamos el primer campo
                   que contiene un error.
                */
                const firstError =
                    applicationForm.querySelector(
                        ".input-error-field"
                    );


                /*
                   Llevamos el cursor
                   al primer campo incorrecto.
                */
                if (firstError) {

                    firstError.focus();

                    firstError.scrollIntoView({

                        behavior: "smooth",

                        block: "center"

                    });

                }


                return;

            }


            /* =================================================
               DATOS DEL FORMULARIO
               ================================================= */


            /*
               Creamos un objeto con todos
               los datos introducidos por el usuario.
            */
            const formData = {

                name:
                    nameInput.value.trim(),

                document:
                    documentInput.value.trim(),

                email:
                    emailInput.value.trim(),

                phone:
                    phoneInput.value.trim(),

                type:
                    typeInput.value,

                amount:
                    amountInput.value,

                term:
                    termInput.value,

                destination:
                    destinationInput.value,

                message:
                    messageInput
                        ? messageInput.value.trim()
                        : ""

            };


            /*
               Por ahora los datos se muestran
               en la consola del navegador.

               Más adelante podrán enviarse
               a un backend o servicio externo.
            */
            console.log(
                "Solicitud recibida:",
                formData
            );


            /* =================================================
               MENSAJE DE ÉXITO
               ================================================= */


            showFormMessage(
                applicationForm,
                "✓ Tu solicitud ha sido enviada correctamente. Nos pondremos en contacto contigo pronto.",
                "success"
            );


            /*
               Limpiamos los campos
               después del envío.
            */
            applicationForm.reset();

        }
    );

}


/* =========================================================
   03. FORMULARIOS GENERALES DE FINOVA
   ========================================================= */


/*
   Esta sección permite que otros formularios
   de Finova tengan:

   ✓ Validación de campos required
   ✓ Mensaje de error
   ✓ Mensaje de éxito
   ✓ Sin recargar la página

   IMPORTANTE:

   #applicationForm queda excluido porque
   tiene su propia validación personalizada.
*/


const generalForms =
    document.querySelectorAll(
        "form:not(#applicationForm)"
    );


/*
   Recorremos todos los formularios
   generales encontrados.
*/
generalForms.forEach(form => {


    /* =====================================================
       03.1 ENVÍO DEL FORMULARIO
       ===================================================== */


    form.addEventListener(
        "submit",
        function (event) {


            /*
               Evitamos la recarga
               de la página.
            */
            event.preventDefault();


            /*
               Limpiamos cualquier mensaje
               mostrado anteriormente.
            */
            clearFormMessage(form);


            /*
               Utilizamos la validación
               nativa de HTML.
            */
            if (!form.checkValidity()) {


                /*
                   Mostramos un mensaje general
                   indicando que faltan campos.
                */
                showFormMessage(
                    form,
                    "⚠️ Por favor, completa todos los campos obligatorios antes de enviar.",
                    "error"
                );


                /*
                   El navegador muestra
                   sus propios mensajes
                   de validación.
                */
                form.reportValidity();


                return;

            }


            /*
               Si todo está correcto,
               mostramos el mensaje de éxito.
            */
            showFormMessage(
                form,
                "✓ Formulario enviado correctamente.",
                "success"
            );


            /*
               Obtenemos los datos
               enviados por el formulario.
            */
            const formData =
                new FormData(form);


            /*
               Mostramos temporalmente
               los datos en la consola.

               Posteriormente podrán enviarse
               a un backend.
            */
            console.log(
                "Formulario recibido:",
                Object.fromEntries(formData)
            );


            /*
               Limpiamos los campos
               después del envío.
            */
            form.reset();

        }
    );


    /* =====================================================
       03.2 LIMPIAR MENSAJE AL MODIFICAR CAMPOS
       ===================================================== */


    const fields =
        form.querySelectorAll(
            "input, select, textarea"
        );


    fields.forEach(field => {


        /*
           Al escribir en un campo,
           eliminamos el mensaje general.
        */
        field.addEventListener(
            "input",
            function () {

                clearFormMessage(form);

            }
        );


        /*
           Al cambiar un select
           u otro campo.
        */
        field.addEventListener(
            "change",
            function () {

                clearFormMessage(form);

            }
        );

    });

});