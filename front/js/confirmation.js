/* ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/!\ AFFICHER le numéro de commande sur la page de commande
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */
//Récupérer le numéro de commande dans l'URL
const orderValidationUrl = window.location.search;

const urlParams = new URLSearchParams (orderValidationUrl);

const orderId = urlParams.get('orderId')


//Injecter le numéro de commande dans la page 
// - Sélection de la balise
const validationCommande = document.querySelector('#orderId');
// Injection du HTML
validationCommande.innerHTML = `${orderId}`;