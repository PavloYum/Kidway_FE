import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { addOrganization } from "../redux/organizationSlice";
import { useDispatch } from "react-redux";

const OrganizationErrorSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  description: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  // lat: Yup.number(),
  location: Yup.string(),
  photo: Yup.string(),
  categoryId: Yup.number(),
});

export const OrganizationForm = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <h1>Displaying Error Messages</h1>
      <Formik
        initialValues={{
          name: "",
          description: "",
          // lat: 111,
          location: "",
          photo: "",
          categoryId: 1,
        }}
        validationSchema={OrganizationErrorSchema}
        onSubmit={(values) => {
          dispatch(
            // @ts-ignore
            addOrganization({
              name: values.name,
              description: values.description,
              // lat: values.lat,
              location: values.location,
              photo: values.photo,
              userId: 12,
              categoryId: 1,
            })
          );
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Field name="name" />
            {touched.name && errors.name && <div>{errors.name}</div>}
            <Field name="description" />
            {touched.description && errors.description && (
              <div>{errors.description}</div>
            )}

            <Field name="location" />
            {touched.location && errors.location && <div>{errors.location}</div>}

            <Field name="photo" />
            {touched.photo && errors.photo && <div>{errors.photo}</div>}

            <Field as="select" name="categoryId">
              <option value={"1"}>Red</option>
              <option value={"2"}>Green</option>
              <option value={"3"}>Blue</option>
            </Field>

            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

