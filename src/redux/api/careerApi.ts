import { ICareer } from "@/types/career";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";

const CAREER_URL = '/career';

export const careerApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Create career
    createCareer: build.mutation<ICareer, Partial<ICareer>>({
      query: (data) => ({
        url: `${CAREER_URL}/create-career`,
        method: 'POST',
        data
      }),
      invalidatesTags: [tagTypes.career]
    }),

    // Get all careers
    getAllCareers: build.query<ICareer[], void>({
      query: () => ({
        url: CAREER_URL,
        method: 'GET'
      }),
      providesTags: [tagTypes.career]
    }),

    // Get career by id
    getCareerById: build.query<ICareer, string>({
      query: (id) => ({
        url: `${CAREER_URL}/${id}`,
        method: 'GET'
      }),
      providesTags: [tagTypes.career]
    }),

    // Update career
    updateCareer: build.mutation<ICareer, { id: string; data: Partial<ICareer> }>({
      query: ({ id, data }) => ({
        url: `${CAREER_URL}/${id}`,
        method: 'PATCH',
        data
      }),
      invalidatesTags: [tagTypes.career]
    }),

    // Delete career
    deleteCareer: build.mutation<ICareer, string>({
      query: (id) => ({
        url: `${CAREER_URL}/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: [tagTypes.career]
    })
  }),
  overrideExisting: false
});

export const {
  useCreateCareerMutation,
  useGetAllCareersQuery,
  useGetCareerByIdQuery,
  useUpdateCareerMutation,
  useDeleteCareerMutation
} = careerApi; 