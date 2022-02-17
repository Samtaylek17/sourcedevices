import { FC } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { Spin } from 'antd';
import { addUser } from 'slices/userSlice';
import { RootState } from 'app/rootReducer';

type FormProps = {
  isSubmitted: () => void;
};

const UserForm: FC<FormProps> = ({ isSubmitted }) => {
  const dispatch = useDispatch();

  const { isLoading } = useSelector((state: RootState) => state.users);

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      gender: 'male',
      title: 'ms'
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('First Name Field is Required'),
      lastName: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('First Name Field is Required'),
      email: Yup.string().email('Invalid email address').required('Email Field is Required')
    }),
    onSubmit: (values) => {
      const { firstName, lastName, email, title } = values;
      dispatch(addUser({ firstName, lastName, email, title }));
      setTimeout(() => {
        isSubmitted();
      }, 5000);
    }
  });

  return (
    <Spin spinning={Boolean(isLoading)} delay={500}>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="title">Title</label>
        <select
          name="title"
          className="w-full h-11 rounded-lg border-slate-400 border outline-none my-1 px-3"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.title}>
          <option value="ms">Ms.</option>
          <option value="mrs">Mrs.</option>
          <option value="miss">Miss.</option>
          <option value="mr">Mr.</option>
        </select>
        <label htmlFor="firstName" className="font-medium">
          First Name
        </label>
        <input
          name="firstName"
          className="w-full h-11 rounded-lg border-slate-400 border outline-none my-1 px-3"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.firstName}
        />
        {formik.touched.firstName && formik.errors.firstName ? (
          <div className="text-red-600">{formik.errors.firstName}</div>
        ) : null}

        <label htmlFor="lastName">Last Name</label>
        <input
          name="lastName"
          className="w-full h-11 rounded-lg border-slate-400 border outline-none my-1 px-3"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.lastName}
        />
        {formik.touched.lastName && formik.errors.lastName ? (
          <div className="text-red-600">{formik.errors.lastName}</div>
        ) : null}

        <label htmlFor="email">Email Address</label>
        <input
          name="email"
          type="email"
          className="w-full h-11 rounded-lg border-slate-400 border outline-none my-1 px-3"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="text-red-600">{formik.errors.email}</div>
        ) : null}

        <label htmlFor="gender">Gender</label>
        <select
          name="gender"
          className="w-full h-11 rounded-lg border-slate-400 border outline-none my-1 px-3"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.gender}>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <button type="submit" className="bg-primary text-white rounded-md mt-4 py-3 px-8">
          Submit
        </button>
      </form>
    </Spin>
  );
};

export default UserForm;
