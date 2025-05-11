"use client";

import { useQueryClient } from "@tanstack/react-query";
import { getUser } from "@/app/actions/auth";
import { getGamesByIds, searchGames } from "@/app/api/api";
import { useQuery } from "@tanstack/react-query";

// Custom Hook: الحصول على بيانات المستخدم
export const useGetUser = () => {
  const { data: user, isLoading, isError, error } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        return await getUser();
      } catch (err) {
        console.error("Error fetching user:", err);
        throw err; // إعادة الخطأ حتى يتم التعامل معه من قبل `useQuery`
      }
    },
  });
  return { user, isLoading, isError, error };
};

// Custom Hook: الحصول على الألعاب باستخدام المعرفات
export const useGetGamesWithIds = (ids: string[]) => {
  const { data: games, isLoading, isError, error } = useQuery({
    queryKey: [`games-${ids}`],
    queryFn: async () => {
      try {
        return await getGamesByIds(ids);
      } catch (err) {
        console.error("Error fetching games by IDs:", err);
        throw err; // إعادة الخطأ حتى يتم التعامل معه من قبل `useQuery`
      }
    },
    enabled: ids.length > 0,
  });

  const validGames = Array.isArray(games) ? games : [];
  return { games: validGames, isLoading, isError, error };
};


// Custom Hook: البحث عن الألعاب باستخدام استعلامات متعددة
export const useGetGames = ({
  query = "",
  page = 1,
  pageSize = 21,
  filters = [],
  isDisabled = false,
}: {
  query?: string;
  page?: number;
  pageSize?: number;
  filters?: { filterName: string; option: string }[] | any;
  isDisabled?: boolean;
}) => {
  const { data: games, isLoading, isError, error } = useQuery({
    queryKey: [`games-${page}-${JSON.stringify(filters)}-${query}`],
    queryFn: async () => {
      try {
        return await searchGames(query, page, filters, pageSize);
      } catch (err) {
        console.error("Error searching for games:", err);
        throw err; // إعادة الخطأ حتى يتم التعامل معه من قبل `useQuery`
      }
    },
    enabled: !isDisabled && query.length > 0,
  });

  return { games, isLoading, isError, error };
};








// "use client";

// import { getUser } from "@/app/actions/auth";
// import { getGamesByIds, searchGames } from "@/app/api/api";
// import { useQuery } from "@tanstack/react-query";

// // Custom Hook: الحصول على بيانات المستخدم
// export const useGetUser = () => {
//   const { data: user, isLoading } = useQuery({
//     queryKey: ["user"],
//     queryFn: () => getUser(),
//   });
//   return { user, isLoading };
// };


// // Custom Hook: الحصول على الألعاب باستخدام المعرفات
// export const useGetGamesWithIds = (ids: string[]) => {
//   const { data: games, isLoading } = useQuery({
//     queryKey: [`games-${ids}`],
//     queryFn: () => getGamesByIds(ids),
//     // يمكنك إضافة حالة تمكين (enabled) هنا إذا كنت ترغب في تعطيل الاستعلام
//     enabled: ids.length > 0, // فقط عندما تكون المعرفات موجودة
//   });

//   // تأكد من أن البيانات هي مصفوفة وصحيحة
//   const validGames = Array.isArray(games) ? games : [];
  

//   return { games: validGames, isLoading };
// };

// // Custom Hook: البحث عن الألعاب باستخدام استعلامات متعددة
// export const useGetGames = ({
//   query = "",
//   page = 1,
//   pageSize = 21,
//   filters = [],
//   isDisabled = false,
// }: {
//   query?: string;
//   page?: number;
//   pageSize?: number;
//   filters?: { filterName: string; option: string }[] | any;
//   isDisabled?: boolean;
// }) => {
//   // البحث باستخدام استعلامات متعددة، مع حالة تعطيل إذا لم يكن هناك استعلام
//   const { data: games, isLoading } = useQuery({
//     queryKey: [`games-${page}-${JSON.stringify(filters)}-${query}`],
//     queryFn: async () => await searchGames(query, page, filters, pageSize),
//     enabled: !isDisabled && query.length > 0, // تمكين الاستعلام فقط إذا كان الاستعلام موجودًا
//   });

//   return { games, isLoading };
// };





// "use client";

// import { useQuery } from "@tanstack/react-query";
// import { getGamesByIds, searchGames } from "@/app/api/api";

// // ✅ تعديل: جلب المستخدم من API بدلاً من دالة سيرفر مباشرة
// const fetchUser = async () => {
//   const res = await fetch("/api/me");
//   if (!res.ok) {
//     throw new Error("Failed to fetch user");
//   }
//   return res.json();
// };

// // Custom Hook: الحصول على بيانات المستخدم
// export const useGetUser = () => {
//   const { data: user, isLoading } = useQuery({
//     queryKey: ["user"],
//     queryFn: fetchUser,
//   });
//   return { user, isLoading };
// };

// // Custom Hook: الحصول على الألعاب باستخدام المعرفات
// export const useGetGamesWithIds = (ids: string[]) => {
//   const { data: games, isLoading } = useQuery({
//     queryKey: [`games-${ids}`],
//     queryFn: () => getGamesByIds(ids),
//     enabled: ids.length > 0,
//   });

//   const validGames = Array.isArray(games) ? games : [];
//   return { games: validGames, isLoading };
// };

// // Custom Hook: البحث عن الألعاب باستخدام استعلامات متعددة
// export const useGetGames = ({
//   query = "",
//   page = 1,
//   pageSize = 21,
//   filters = [],
//   isDisabled = false,
// }: {
//   query?: string;
//   page?: number;
//   pageSize?: number;
//   filters?: { filterName: string; option: string }[] | any;
//   isDisabled?: boolean;
// }) => {
//   const { data: games, isLoading } = useQuery({
//     queryKey: [`games-${page}-${JSON.stringify(filters)}-${query}`],
//     queryFn: async () => await searchGames(query, page, filters, pageSize),
//     enabled: !isDisabled && query.length > 0,
//   });

//   return { games, isLoading };
// };
























