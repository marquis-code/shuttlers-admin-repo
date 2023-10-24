import { events_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'

const credentials: { [k: string]: any } = reactive({
    title: '',
    type: '',
    description: '',
    location: {},
    attendees: null,
    returnTrip: true,
    banner: '',
    dateRange: [],
    payment: true,
    events: []
})

const eventOptions = [
    { name: 'Conferences', value: ref(false) },
    { name: 'Trade shows', value: ref(false) },
    { name: 'Weddings', value: ref(false) },
    { name: 'Corporate meetings', value: ref(false) },
    { name: 'Product launches', value: ref(false) },
    { name: 'Charity fundraisers', value: ref(false) },
    { name: 'Sporting events', value: ref(false) },
    { name: 'Sporting events', value: ref(false) },
    { name: 'Art exhibitions', value: ref(false) },
    { name: 'Awards ceremonies', value: ref(false) },
    { name: 'Fashion shows', value: ref(false) },
    { name: 'Workshops', value: ref(false) },
    { name: 'Networking events', value: ref(false) },
    { name: 'Seminars', value: ref(false) },
    { name: 'Cultural festivals', value: ref(false) },
    { name: 'Galas', value: ref(false) },
    { name: 'Team-building activities', value: ref(false) },
    { name: 'Charity runs', value: ref(false) },
    { name: 'Film screenings', value: ref(false) },
    { name: 'Book signings', value: ref(false) },
    { name: 'Comedy shows', value: ref(false) },
    { name: 'Food and wine tastings', value: ref(false) },
    { name: 'Political rallies', value: ref(false) },
    { name: 'Science fairs', value: ref(false) },
    { name: 'Car shows', value: ref(false) },
    { name: 'Technology expos', value: ref(false) },
    { name: 'Yoga retreats', value: ref(false) },
    { name: 'Children\'s parties', value: ref(false) },
    { name: 'Holiday celebrations', value: ref(false) },
    { name: 'Trade fairs', value: ref(false) }
]

const descriptionLength = ref(0)

export const useCreateEvent = () => {
    const loadingCreateEvent = ref(false)
    const disabled = computed({

        get: () => {
            if (
                !(
                    credentials.title &&
                    credentials.type &&
                    credentials.description &&
                    credentials.attendees &&
                    // credentials.banner &&
                    credentials.dateRange.length &&
                    credentials.description &&
                    Object.keys(credentials.location).length
                )
            )
                return true
            return false
        },
        set: () => { }
    })

    const createEvent = async () => {
        loadingCreateEvent.value = true
        try {
            const res = (await events_api.$_create_event({
                title: credentials.title,
                type: credentials.type,
                description: credentials.description,
                location: credentials.location.name,
                attendees: Number(credentials.attendees),
                tripDate: credentials.dateRange[0],
                banner: credentials.banner,
                returnTrip: credentials.returnTrip,
                returnDate: credentials.dateRange[1] ? credentials.dateRange[1] : null,
                payment: credentials.payment ? 'attendees' : 'organizer'
            })) as CustomAxiosResponse

            if (res.type !== 'ERROR') {
                useRouter().push('/events')
                useAlert().openAlert({
                    type: 'SUCCESS',
                    msg: 'Event created successfully'
                })
            }
        } catch (err) {
            useAlert().openAlert({
                type: 'ERROR',
                msg: 'Something went wrong, please try again'
            })
        }
    }

    return { createEvent, loadingCreateEvent, credentials, disabled, eventOptions, descriptionLength }
}
