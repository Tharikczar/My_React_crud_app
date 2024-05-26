import { useFieldArray, useForm } from "react-hook-form";
import { TextField, Button } from "@mui/material";
import { DevTool } from "@hookform/devtools";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";



type FormValues = {
    email: string;
    name: string;
    contactNo: string;
    education: {
        educationType: string;
        percentage: string;
        passedOutYear: string;
    }[];

};


const RegisterEmployee = () => {
    const {
        handleSubmit,
        register,
        formState: { errors },
        control,
        setValue,reset
    } = useForm<FormValues>({
        defaultValues: {
            email: "",
            name: "",
            contactNo: "",
            education: [{
                educationType: "",
                percentage: "",
                passedOutYear: ""
            }]
        },
    });
    const { id } = useParams<{ id: string }>();
    const { fields, append, remove } = useFieldArray({
        name: "education",
        control,
    });

    const navigateTo = useNavigate();

    const resetForm = ()=>{
        reset()
    }
    
    useEffect(() => {
        // Fetch data from API
        if(id != undefined){
            fetch(`http://localhost:8000/posts/${id}`)
            .then(response => response.json())
            .then(data => {
                // Set default values using setValue
                setValue('email', data.email, {
                    shouldValidate: true,
                    shouldDirty: true,
                    shouldTouch: true,
                });
                setValue('name', data.name, {
                    shouldValidate: true,
                    shouldDirty: true,
                    shouldTouch: true,
                });
                setValue('contactNo', data.contactNo, {
                    shouldValidate: true,
                    shouldDirty: true,
                    shouldTouch: true,
                });

                // Set education values
                data.education.forEach((edu, index) => {
                    setValue(`education.${index}.educationType`, edu.educationType, {
                        shouldValidate: true,
                        shouldDirty: true,
                        shouldTouch: true,
                    });
                    setValue(`education.${index}.percentage`, edu.percentage, {
                        shouldValidate: true,
                        shouldDirty: true,
                        shouldTouch: true,
                    });
                    setValue(`education.${index}.passedOutYear`, edu.passedOutYear, {
                        shouldValidate: true,
                        shouldDirty: true,
                        shouldTouch: true,
                    });
                });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
        }
    }, [id, setValue]);

    const onSubmit = (data: FormValues) => {
        console.log(data);
        const formattedData = {
            ...data,
        };
        fetch('http://localhost:8000/posts', {
            method: 'POST',
            body: JSON.stringify(formattedData),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((savedData) => {
                console.log(savedData);
              if(savedData){
                navigateTo(`/allEmp`)
              }
                // Handle data
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    return (
        <>
            <div className="container w-full flex justify-center items-center h-screen">
                <div className="w-full md:w-3/4 lg:w-2/4 bg-[#d0bf73] p-6 ">
                    <h1 className="text-2xl text-center">Employee Portal </h1>
                    <form className="p-5 font-sans" onSubmit={handleSubmit(onSubmit)} noValidate>
                        <h3 className="mb-3 ">Personal Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <TextField
                                label="Email"
                                type="email"
                                {...register("email", { required: "Email is required" })}
                                error={!!errors.email}
                                helperText={errors.email?.message}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField
                                label="name"
                                type="text" // Assuming this should be a password field
                                {...register("name", { required: "name is required" })}
                                error={!!errors.name}
                                helperText={errors.name?.message}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField
                                label="Contact No"
                                type="text"
                                {...register("contactNo", { required: "Contact number is required" })}
                                error={!!errors.contactNo}
                                helperText={errors.contactNo?.message}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </div>
                        <div className="flex justify-between items-center py-3">
                            <h3 className="mt-2">Education</h3>
                            <Button variant="outlined" size="small" onClick={() => append({ educationType: "", passedOutYear: "", percentage: "" })}>
                                Add
                            </Button>
                        </div>
                        <div>
                            {fields.map((field, index) => (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-3" key={field.id}>
                                    <TextField
                                        label="Education Type"
                                        type="text"
                                        {...register(`education.${index}.educationType`, { required: "Education Type is required" })}
                                        error={!!errors.education?.[index]?.educationType}
                                        helperText={errors.education?.[index]?.educationType?.message}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                    <TextField
                                        label="Percentage"
                                        type="text"
                                        {...register(`education.${index}.percentage`, { required: "Percentage is required" })}
                                        error={!!errors.education?.[index]?.percentage}
                                        helperText={errors.education?.[index]?.percentage?.message}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                    <TextField
                                        label="Passed Out Year"
                                        type="text"
                                        {...register(`education.${index}.passedOutYear`, { required: "Year is required" })}
                                        error={!!errors.education?.[index]?.passedOutYear}
                                        helperText={errors.education?.[index]?.passedOutYear?.message}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                    {index > 0 && (
                                        <Button variant="outlined" color="secondary" size="small" onClick={() => remove(index)}>
                                            Remove
                                        </Button>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-row-2 gap-4 mt-4">
                            <Button className="col-span-2" type="submit" variant="contained" color="primary" size="large">
                                Submit
                            </Button>
                            <Button variant="text" type="reset" color="secondary" size="large" onClick={resetForm}>
                                Reset
                            </Button>
                            <Button className="col-span-3" variant="contained" type="reset" color="success" size="large">
                                All Employee Data
                            </Button>
                        </div>
                    </form>
                    <DevTool control={control} />
                </div>
               
            </div>

        </>
    )
}

export default RegisterEmployee