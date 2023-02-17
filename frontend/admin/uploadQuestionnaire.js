async function uploadQuestionnaire(file) {
    const url = `${baseURL}/admin/questionnaire_upd`;
  
    try {
      //Metatrepei to argument file pou dineis se dedomena tupou formdata
      //gia na mporei na to ensomatoposei sto parakatw post request
      const formData = new FormData();
      formData.append('file', file);
  
      //Edw ginetai to POST request gia na steiloyme dedomena sto API
      const response = await fetch(url, {
        method: 'POST',
        body: formData
      });
      //Edw diaxiromaste ksexwrista kathe kodiko sfalmatos poy mpopei
      //na prokipsei apo to api.
      if (!response.status(500)) {
        throw new Error('Internal Server Error');
      }
      if (!response.status(402)) {
        throw new Error('No data');
      }
      if (!response.status(401)) {
        throw new Error('Not authorized');
      }
      if (!response.status(400)) {
        throw new Error('Bad Request');
      }
      //An epistrepsei 200 shmanei oti oloklirothike to request
      const data = await response.json();
      //Edw epistrefw genika ta dedomena poy apantise to API alla mporeis na epistrepseis sxetiko mhnuma
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }