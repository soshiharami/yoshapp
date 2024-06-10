import axios from "axios";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import type { NextPage } from "next";
import { useEffect, useState } from "react";

const daysOfWeek: string[] = ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '木曜日', '土曜日'];

type GetJapaneseDay = (date: Date) => string;

const getJapaneseDay: GetJapaneseDay = (date) => {
  const dayIndex: number = parseInt(format(date, 'i', { locale: ja }), 10) - 1;
  return daysOfWeek[dayIndex];
};

const FrameComponent: NextPage = () => {
  const [user, setUser] = useState<{ email: string, name: string } | null>(null);


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:5000/current_user', { withCredentials: true });
        setUser(res.data);
      } catch (error) {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

    const date = new Date()
  return (
<div className="fixed top-0 right-0 w-[343px] h-auto shadow-[0px_5px_20px_#c0c7d6] rounded-8xs [background:linear-gradient(180deg,_#679cf6,_#4072ee)] flex flex-col items-start justify-start p-[30px] box-border gap-[8px] text-left text-xl text-white font-roboto mq450:w-[280px] mq450:gap-[16px] z-[2]">
  <h2>{format(date, "yyyy年 MM月 dd日")}</h2>
  <span>{getJapaneseDay(date)}</span>
  <span>{user?.name}</span>
</div>
  );
};

export default FrameComponent;
