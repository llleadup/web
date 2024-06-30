import { useState, useEffect } from "react";
import { deleteRequest, getRequest, postRequest, slugify } from "@/utils";

const TodoColumn = ({ todo, userId, direction }) => {
  const [todoItems, setTodoItems] = useState([]);
  const [completedTodoItems, setCompletedTodoItems] = useState(new Set());
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTodoItems = async () => {
      try {
        const { data: allTodoItems } = await getRequest(
          `/api/todo-items/all?id=${todo.id}`
        );
        setTodoItems(allTodoItems);
      } catch (error) {
        setError(error.message);
      }
    };

    const fetchCompletedTodoItems = async () => {
      try {
        const { data: userTodoItems } = await getRequest(
          `/api/todo-items/user?user_id=${userId}`
        );
        const completedTodoItems = new Set(
          userTodoItems.map((t) => t.todo_item_id)
        );
        setCompletedTodoItems(completedTodoItems);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchTodoItems();
    fetchCompletedTodoItems();
  }, [todo.id, userId]);

  const handleTodoItemClick = async (todoItemId) => {
    try {
      const response = await postRequest("/api/todo-items/add", {
        userId,
        todoItemId,
        directionId: direction.id,
      });

      if (response.message === "Progress added") {
        setCompletedTodoItems((prev) => new Set(prev).add(todoItemId));
      } else if (response.message === "Progress already exists") {
        try {
          const response = await deleteRequest("/api/todo-items/remove", {
            userId,
            todoItemId,
            directionId: direction.id,
          });
          if (response.message === "Progress removed") {
            setCompletedTodoItems((prev) => {
              const newSet = new Set(prev);
              newSet.delete(todoItemId);
              return newSet;
            });
          }
        } catch (error) {
          console.error("Error removing progress:", error);
          setError(error.message);
        }
      }
    } catch (error) {
      console.error("Error adding progress:", error);
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col border-r-2 border-bg-accent-2">
      <div className="flex items-center min-w-[300px] py-4 px-2 border-b border-bg-accent-2">
        <div className="w-full hover:bg-bg-accent-2 text-base font-medium rounded-md py-2 px-3 h-16">
          {todo.name}
        </div>
      </div>
      {error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <div className="flex flex-col gap-1.5 p-3">
          {todoItems &&
            todoItems.map((t) => (
              <div
                onClick={() => handleTodoItemClick(t.id)}
                key={t.id}
                className="overflow-hidden relative flex items-center justify-between min-w-[300px] gap-4 px-4 py-2.5 bg-bg-accent-3 rounded-md border border-transparent transition-all duration-300 hover:border-primary cursor-pointer"
              >
                <span className="text-base font-medium flex-1">{t.title}</span>
                <div className="flex justify-center items-center size-4 rounded-sm bg-bg-accent">
                  {completedTodoItems.has(t.id) && (
                    <div className="text-base">✅</div>
                  )}
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default TodoColumn;
