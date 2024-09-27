const getRelativeCount = (count: number): string => {
     if (count === 0) {
          return "0"
     }

     switch (true) {
          case count >= 1e9:
               return (count / 1e9).toFixed(1).replace(/\.0$/, "") + "B"
          case count >= 1e6:
               return (count / 1e6).toFixed(1).replace(/\.0$/, "") + "M"
          case count >= 1e3:
               return (count / 1e3).toFixed(1).replace(/\.0$/, "") + "K"
          default:
               return count.toString()
     }
}

export default getRelativeCount
