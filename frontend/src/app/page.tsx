import TodoList from "@/components/TodoList";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col gap-5 p-6">
      <h1 className="text-4xl text-center">Welcome to TO DO list App</h1>
      <TodoList />
    </main>
  );
}
