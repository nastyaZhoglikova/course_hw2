import React from "react";
function Form (props)  {
  return (
    <div>
      <div>
        <form onSubmit={props.handleSubmit}>
          <div>
            <input
              placeholder="Title"
              type="text"
              name="title"
              required
              className="w-full rounded-md px-4 py-2 bg-inherit border mb-6"
              onChange={props.handleInputChange}
              value={props.todo?.title}
            />
          </div>
          <div>
            <input
              placeholder="Task"
              type="text"
              name="text"
              required
              className="w-full rounded-md px-4 py-2 bg-inherit border mb-6"
              onChange={props.handleInputChange}
              value={props.todo?.text}
            />
          </div>
          <div>
            <input
              placeholder="Priority (1-5)"
              type="number"
              max="5"
              min="1"
              name="priority"
              required
              className="w-full rounded-md px-4 py-2 bg-inherit border mb-6"
              onChange={props.handleInputChange}
              value={props.todo?.priority}
            />
          </div>
          <div>
            <input
              placeholder="Date"
              type="date"
              name="date"
              required
              className="w-full rounded-md px-4 py-2 bg-inherit border mb-6"
              onChange={props.handleInputChange}
              value={props.todo?.date_done}
            />
          </div>
          <button
            className="button"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>

  );
};

export default Form;
