import React from 'react';

const Info = () => {
  return (
    <div className='bg-purple-200 dark:border-gray-700 mr-2 ml-2 p-4 rounded'>
      <h2 className='text-lg font-bold mb-2'>Project Information:</h2>
      <ol className='list-decimal pl-4'>
        <li className='text-left'>You can create any entity by clicking on the top buttons and it will take you to their respective pages.</li>
        <li className='text-left'>When you make an entry, you can later edit it by clicking on the edit button and delete it by clicking on the delete button.</li>
        <li className='text-left'>In the class view, you will see the composition of the student in the form of a pie graph.</li>
        <li className='text-left'>On the backend side the pagination is available, you can test the endpoints useing postman or thunderclient.</li>
      </ol>
    </div>
  );
};

export default Info;
