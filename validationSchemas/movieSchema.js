import * as Yup from 'yup'

const MovieSchema = Yup.object().shape({
    title: Yup.string().required('Required'),
    releaseDate: Yup.string().required('Required'),
    movieUrl: Yup.string().required('Required'),
    overview: Yup.string().required('Required'),
    genres: Yup.string().required('Required'),
    runtime: Yup.number()
        .typeError('Runtime must be a number')
        .positive('Runtime must be greater than zero')
        .required('Required'),
})

export default MovieSchema
