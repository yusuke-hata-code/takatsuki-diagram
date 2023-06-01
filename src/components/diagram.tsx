import { useEffect, useState } from 'react';
import style from './diagram.module.css';
import type { FC } from 'react';

type Props = { dist: 'takatsuki' | 'tonda' };

type State = { diagramArr: number[] };

const distObj = {
  takatsuki: 'たかつき',
  tonda: 'とんだ',
};
const distImg = {
  takatsuki: 'basuo.png',
  tonda: 'yayoi.png',
};

const tommorrowNow = new Date(Date.now() + 1000 * 3600 * 24);
const tomorrow = new Date(
  tommorrowNow.getFullYear(),
  tommorrowNow.getMonth(),
  tommorrowNow.getDate(),
  0,
  0
);

export const DiagramTable: FC<Props> = ({ dist }) => {
  const [diagram, setDiagram] = useState<State>({
    diagramArr: [0, 1],
  });
  useEffect(() => {
    (async () => {
      const takatsukiResponse = await (
        await fetch(`/api/diagram?dest=${dist}`)
      ).json();
      setDiagram({ ...diagram, diagramArr: takatsukiResponse });
    })();

    setTimeout(() => {
      location.reload();
    }, tomorrow.getTime() - Date.now() + 1000 * 3600 * 7);
  }, []);

  return (
    <>
      {filterDiagramArr({ state: diagram }) ? (
        filterDiagramArr({ state: diagram })?.map((diagram, i) => {
          return (
            <>
              <div className={i ? style.none : style[dist]}>
                {distObj[dist]}
              </div>
              <div className={i ? style.subDiagram : style.diagram}>
                <div className={style.time}>{diagram.time}</div>
                <div className={style.limit}>
                  {Math.trunc(diagram.limit / 60) > 9
                    ? `あと${Math.trunc(diagram.limit / 60)}分`
                    : `あと${Math.trunc(diagram.limit / 60)}分${
                        diagram.limit - Math.trunc(diagram.limit / 60) * 60
                      }秒`}
                </div>
              </div>
              <div>
                <div
                  className={
                    Math.trunc(diagram.limit / 60) < 10
                      ? style.alert
                      : style.none
                  }
                >
                  おくれないでね
                </div>
              </div>
            </>
          );
        })
      ) : (
        <div className={style.none}>本日の運行は終了しました</div>
      )}
    </>
  );
};

export const filterDiagramArr = ({ state }: { state: State }) => {
  const currentTime = Date.now();

  if (state) {
    const filteredDiagramArr = state.diagramArr
      .filter((diagram: number) => {
        return diagram >= currentTime;
      })
      .filter((_, i: number) => {
        return i < 3;
      });

    const limitTimeTable = limitMinute({ diagramArr: filteredDiagramArr });
    const timeTable = unixTimeToViewTime({ diagramArr: filteredDiagramArr });

    return timeTable.map((time, i) => {
      return { time: time, limit: limitTimeTable[i] };
    });
  }
};

const unixTimeToViewTime = ({
  diagramArr,
}: {
  diagramArr: number[];
}): string[] => {
  return diagramArr.map((diagram) => {
    const hour = new Date(diagram).getHours();
    const minute = String(new Date(diagram).getMinutes()).padStart(2, '0');

    return `${hour}:${minute}`;
  });
};

const limitMinute = ({ diagramArr }: { diagramArr: number[] }) => {
  const currentMinutes =
    new Date().getHours() * 3600 +
    new Date().getMinutes() * 60 +
    new Date().getSeconds();

  return diagramArr.map((diagram: number) => {
    const diagramMinutes =
      new Date(diagram).getHours() * 3600 +
      new Date(diagram).getMinutes() * 60 +
      new Date(diagram).getSeconds();

    return diagramMinutes - currentMinutes;
  });
};
