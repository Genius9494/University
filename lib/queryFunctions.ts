"use client";

import { getUser } from "@/app/actions/auth";
import { getGamesByIds, searchGames } from "@/app/api/api";
import { useQuery } from "@tanstack/react-query";

// Custom Hook: الحصول على بيانات المستخدم
export const useGetUser = () => {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(),
  });
  return { user, isLoading };
};


// Custom Hook: الحصول على الألعاب باستخدام المعرفات
export const useGetGamesWithIds = (ids: string[]) => {
  const { data: games, isLoading } = useQuery({
    queryKey: [`games-${ids}`],
    queryFn: () => getGamesByIds(ids),
    // يمكنك إضافة حالة تمكين (enabled) هنا إذا كنت ترغب في تعطيل الاستعلام
    enabled: ids.length > 0, // فقط عندما تكون المعرفات موجودة
  });

  // تأكد من أن البيانات هي مصفوفة وصحيحة
  const validGames = Array.isArray(games) ? games : [];
  

  return { games: validGames, isLoading };
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
  // البحث باستخدام استعلامات متعددة، مع حالة تعطيل إذا لم يكن هناك استعلام
  const { data: games, isLoading } = useQuery({
    queryKey: [`games-${page}-${JSON.stringify(filters)}-${query}`],
    queryFn: async () => await searchGames(query, page, filters, pageSize),
    enabled: !isDisabled && query.length > 0, // تمكين الاستعلام فقط إذا كان الاستعلام موجودًا
  });

  return { games, isLoading };
};
