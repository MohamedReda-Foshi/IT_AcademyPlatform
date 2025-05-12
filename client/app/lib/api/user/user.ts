



export interface User{


id: string;
firstname: string;
lasname:string

}










export async function fetchLessonById(id: string): Promise<User[]> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_EXPRESS_URL}/course/lesson${id}`);
        if (!res.ok) {
            throw new Error(`Network response was not ok(${res.status})`);
            
        }
        return await res.json();
    } catch (error) {
        console.error('Error fetching course with id ${id}:', error);
        return [];
    }
} 