import { baseApi } from "../../api/baseApi";

const skillsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSkill: builder.mutation({
      query: (userInfo) => ({
        url: "/skill",
        method: "POST",
        body: userInfo,
      }),
    }),
    getSkills: builder.query({
      query: () => ({
        url: "/skill",
        method: "GET",
      }),
    }),
    getSingleSkills: builder.query({
      query: (id) => ({
        url: `/skills/getSingleSkills/${id}`,
        method: "GET",
      }),
    }),
    updateSkills: builder.mutation({
      query: (data) => ({
        url: `/skills/updateSkills/${data?.id}`,
        method: "PUT",
        body: data?.info,
      }),
    }),
    deleteSkills: builder.mutation({
      query: (id) => ({
        url: `/skill/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetSkillsQuery,
  useCreateSkillMutation,
  useDeleteSkillsMutation,
  useGetSingleSkillsQuery,
  useUpdateSkillsMutation,
} = skillsApi;
