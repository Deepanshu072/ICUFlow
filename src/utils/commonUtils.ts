export function formatDateToYYYYMMDD(dateString?: string): string | undefined {
      if (!dateString) return undefined;
      const date = new Date(dateString);
      const year = date.getUTCFullYear();
      const month = String(date.getUTCMonth() + 1).padStart(2, '0');
      const day = String(date.getUTCDate()).padStart(2, '0');
      
      return `${year}-${month}-${day}`;
    }

 export   const parseDate = (dateString?: string): Date | undefined => {
      if (!dateString) return undefined;
      const date = new Date(dateString);
      return isNaN(date.getTime()) ? undefined : date;
    };

    export function formatDateToYYYYMMDD2(date: Date | string | null | undefined): string {
      if (!date) return '';

      const dateObj = typeof date === 'string' ? new Date(date) : date;
      
      const year = dateObj.getFullYear();
      const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Add 1 as months are 0-based
      const day = String(dateObj.getDate()).padStart(2, '0');

      return `${year}-${month}-${day}`;
    }