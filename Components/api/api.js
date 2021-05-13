const baseUrl = "https://api.ilearncapstone.com/api";

const SignUp = async ({username , password , email}) => {
    const body = {user_name : username, email, password};
     try {
        const res = await fetch(`${baseUrl}/user/register`, {
            method: 'POST',
            headers: {
                Accept: "application/json",
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(body)
        })

    
        if(res.status == 200) {
            const data = await res.json();
            
            console.log(data);

            return data; 
    
        } else {
            return {code: res.status}
        }
     } catch(err) {
         console.log(err);
     }

}


const Login = async ({email, password}) => {
    const body = {identifier: email, password};

    try {

        const res = await fetch(`${baseUrl}/user/login`, {
            method: 'POST',
            headers: {
                Accept: "application/json",
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(body)
        })

        if (res.status == 200){

            const _res = await res.json();
            return _res;

        } else {
            return {code: res.status};
        }

    } catch(error){
        console.log(error);
    }
}



const getAllCourses = async () => {
    try {
        
       const res = await fetch(`${baseUrl}/course` , {
           method: "GET",
           headers: {
            Accept: "application/json",
            'Content-Type': 'application/json'
           }
       })

       if(res.status == 200) {
           const _res = await res.json();
            return _res.data;
       } else {
           console.log(res.status);
       }

    } catch(err){
        console.log(err);
    }
}



const getNotificationSettings = async (token) => {
    try {

        const res = await fetch(`${baseUrl}/user/setting`, {
            method: "GET",
            headers: {
                Authorization: "bearer " + token,
                Accept: "application/json",
                'Content-Type': 'application/json'
               },
        })

        if(res.status == 200){

            const _res = await res.json();

            return _res;

        } else {
            console.log(res.status);
        }

    } catch(error) {
        console.log(error);
    }
}


const updateNotificationSettings = async (body) => {
    try {

        const res = await fetch(`${baseUrl}/user/setting`, {
            method: "POST",
            headers: {
                Authorization: "bearer " + body.token,
                Accept: "application/json",
                'Content-Type': 'application/json'
               },
            body: JSON.stringify(body)
        })

        if(res.status == 200){

            const _res = await res.json();

            return _res;

        } else {
            console.log(res.status);
        }

    } catch(error) {
        console.log(error);
    }
}


const getQuestionById = async (id) => {

}


const getQuestionsByCourseID = async (id) => {

    try {

        const res = await fetch(`${baseUrl}/question_module/course/${id}`, {
            method: "GET",
            headers: {
             Accept: "application/json",
             'Content-Type': 'application/json'
            }
        });

        if(res.status == 200){
            const _res = await res.json();
            return _res.data;
        } else {
            console.log(res.status);
        }

    } catch(error){
        console.log(error);
    }

}


const putUserProgress = async (body) => {
    try {

        const res = await fetch(`${baseUrl}/user_progress/`, {
            method: "POST",
            headers: {
                Authorization: "bearer " + body.token,
                Accept: "application/json",
                'Content-Type': "application/json"
            },
            body: JSON.stringify({module_id: body._id, count: body.count})
        })

        if(res.status == 200){

            const _res = await res.json();

            return _res;

        } else {
            console.log(res.status);
        }

    }catch(error){
        console.log(error);
    }
}


const getUserProgress = async (token) => {
    try {

        const res = await fetch(`${baseUrl}/user_progress/`, {
            method: 'GET',
            headers: {
                Authorization: "bearer " + token,
                Accept: "application/json",
                'Content-Type': 'application/json'
            }
        });

        if(res.status == 200){

            const _res = await res.json();

            return _res;

        } else {
            console.log(res.status);
        }

    } catch(error){
        console.log(error);
    }
}


const deleteQuestionModuleById = async (id) => {

}

const updateQuestionById = async (id, body) => {

}

const addNewQuestion = async (body) => {

}

const deleteCourseByID = async (id) => {

}

const updateCourseById = async (id) => {

}




const updateUser = async ({user_name, password, email, token}) => {
    try {

        const res = await fetch(`${baseUrl}/user/update_profile`, {
            method: "PATCH",
            headers: {
                Authorization: "bearer " + token,
                Accept: "application/json",
                'Content-Type': 'application/json'
               },
            body: JSON.stringify({user_name, password, email})
        })

        if(res.status == 200){

            const _res = await res.json();

            return _res;

        } else {
            console.log(res.status);
        }

    } catch(error) {
        console.log(error);
    }
}

const getCourseById = async (id, token) => {
    try {

        const res = await fetch(`${baseUrl}/course/${id}`, {
            method: "GET",
            headers: {
                Authorization: "bearer " + token,
                Accept: "application/json",
                'Content-Type': 'application/json'
               }
        });


        if(res.status == 200){

            const _res = await res.json();

            return _res;

        } else {
            console.log(res.statusText);
        }

    }catch(error){
        console.log(error);
    }
}

export {SignUp, getCourseById, getNotificationSettings, getUserProgress, updateNotificationSettings, addNewQuestion, getAllCourses, Login, deleteCourseByID, deleteQuestionModuleById, updateCourseById, putUserProgress, updateQuestionById, updateUser, getQuestionById, getQuestionsByCourseID};