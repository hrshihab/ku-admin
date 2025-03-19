import { baseApi } from './baseApi';
import { tagTypes } from '../tag-types';

export const vcMessageApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Create VC Message 
    createVCMessage: build.mutation({
      query: (data) => ({
        url: '/vc-message',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [tagTypes.vcMessage],
    }),

    // Get VC Message
    getVCMessage: build.query({
      query: () => ({
        url: '/vc-message/get-vc-message',
        method: 'GET',
      }),
      providesTags: [tagTypes.vcMessage],
    }),

    // Update VC Message
    updateVCMessage: build.mutation({
      query: ({ id, ...body }) => {
        //console.log(body);
        return {
          url: `/vc-message/update-vc-message/${id}`,
          method: 'PUT',
          contentType: 'application/json',
          data: body,
        }
      },
      invalidatesTags: [tagTypes.vcMessage],
    }),

    // Delete VC Message
    deleteVCMessage: build.mutation({
      query: (id) => ({
        url: `/vc-message/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [tagTypes.vcMessage],
    }),
  }),
  overrideExisting: true
});

export const {
  useCreateVCMessageMutation,
  useGetVCMessageQuery,
  useUpdateVCMessageMutation,
  useDeleteVCMessageMutation,
} = vcMessageApi;
