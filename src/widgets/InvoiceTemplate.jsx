// -------------------- PACKAGE IMPORT FILES -------------------- //
import React from 'react'
import { FaRupeeSign } from "react-icons/fa";

const InvoiceTemplate = () => {
  return (
    <div
      className="w-[210mm] my-10 h-[297mm] mx-auto bg-white p-10 shadow-lg border-black border"
      style={{ fontFamily: "Arial, sans-serif" }}
    >
      <header className="flex text-xs justify-between items-center">
        <div>
          <h1 className="text-xl font-bold">Reeplayer Global Services Private Limited (RGS)</h1>
          <p>Sold By: Store Location</p>
          <p>Store Address</p>
          <p>+91 1525478951</p>
          <p>PAN No - 1524154875145214</p>
          <p>GSTIN -</p>
        </div>
        <div>
          <img
            src="https://i.ibb.co/Nxb9kpf/rgslogo2.jpg"
            alt="Logo"
            className="w-20 h-20 object-contain"
          />
        </div>
      </header>

      <hr className="my-4 border-gray-400" />
      <section className="flex text-xs justify-between">
        <div>
          <p className="font-bold">Billed To:</p>
          <p>Vedansh Jain</p>
          <p>123 Anywhere St., Any City, ST 12345</p>
          <p>jhfvhbvesdjfuvbhebsvuierhbyvguehrbverhuyfvb</p>
          <p>+91 4152614587</p>
        </div>
        <div className="text-right text-xs">
          <p>ORDER ID - RGS/1526475-12548996</p>
          <p>DOP - 04 JANUARY 2025</p>
          <p>TIME - 1:30 PM</p>
        </div>
      </section>

      <hr className="my-4 border-gray-400" />
      <section>
        <table className="w-full border-collapse border text-xs border-gray-400">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="border border-gray-400 px-2 py-1">S.NO</th>
              <th className="border border-gray-400 px-2 py-1">DESCRIPTION</th>
              <th className="border border-gray-400 px-2 py-1">MRP</th>
              <th className="border border-gray-400 px-2 py-1">USP</th>
              <th className="border border-gray-400 px-2 py-1">QTY</th>
              <th className="border border-gray-400 px-2 py-1">DISCOUNT</th>
              <th className="border border-gray-400 px-2 py-1">TAX</th>
              <th className="border border-gray-400 px-2 py-1">SUBTOTAL</th>
            </tr>
          </thead>
          <tbody>
            {/* Dummy Data */}


            <tr>
              <td className="border border-gray-400 px-2 py-1 text-center">1</td>
              <td className="border border-gray-400 break-words px-2 py-1">XYZ</td>
              <td className="border border-gray-400 px-2 py-1 text-center">500</td>
              <td className="border border-gray-400 px-2 py-1 text-center">450</td>
              <td className="border border-gray-400 px-2 py-1 text-center">2</td>
              <td className="border border-gray-400 px-2 py-1 text-center">10%</td>
              <td className="border border-gray-400 px-2 py-1 text-center">18%</td>
              <td className="border border-gray-400 px-2 py-1 text-center">1000.05</td>
            </tr>
            <tr>
              <td className="border border-gray-400 px-2 py-1 text-center">1</td>
              <td className="border border-gray-400 break-words px-2 py-1">XYZ</td>
              <td className="border border-gray-400 px-2 py-1 text-center">500</td>
              <td className="border border-gray-400 px-2 py-1 text-center">450</td>
              <td className="border border-gray-400 px-2 py-1 text-center">2</td>
              <td className="border border-gray-400 px-2 py-1 text-center">10%</td>
              <td className="border border-gray-400 px-2 py-1 text-center">18%</td>
              <td className="border border-gray-400 px-2 py-1 text-center">1000.05</td>
            </tr>
            <tr>
              <td className="border border-gray-400 px-2 py-1 text-center">1</td>
              <td className="border border-gray-400 px-2 py-1">XYZ</td>
              <td className="border border-gray-400 px-2 py-1 text-center">500</td>
              <td className="border border-gray-400 px-2 py-1 text-center">450</td>
              <td className="border border-gray-400 px-2 py-1 text-center">2</td>
              <td className="border border-gray-400 px-2 py-1 text-center">10%</td>
              <td className="border border-gray-400 px-2 py-1 text-center">18%</td>
              <td className="border border-gray-400 px-2 py-1 text-center">1000.05</td>
            </tr>
            <tr>
              <td className="border border-gray-400 px-2 py-1 text-center">1</td>
              <td className="border border-gray-400 px-2 py-1">XYZ</td>
              <td className="border border-gray-400 px-2 py-1 text-center">500</td>
              <td className="border border-gray-400 px-2 py-1 text-center">450</td>
              <td className="border border-gray-400 px-2 py-1 text-center">2</td>
              <td className="border border-gray-400 px-2 py-1 text-center">10%</td>
              <td className="border border-gray-400 px-2 py-1 text-center">18%</td>
              <td className="border border-gray-400 px-2 py-1 text-center">1000.05</td>
            </tr>
            <tr>
              <td className="border border-gray-400 px-2 py-1 text-center">1</td>
              <td className="border border-gray-400 px-2 py-1">XYZ</td>
              <td className="border border-gray-400 px-2 py-1 text-center">500</td>
              <td className="border border-gray-400 px-2 py-1 text-center">450</td>
              <td className="border border-gray-400 px-2 py-1 text-center">2</td>
              <td className="border border-gray-400 px-2 py-1 text-center">10%</td>
              <td className="border border-gray-400 px-2 py-1 text-center">18%</td>
              <td className="border border-gray-400 px-2 py-1 text-center">1000.05</td>
            </tr>
            <tr>
              <td className="border border-gray-400 px-2 py-1 text-center">1</td>
              <td className="border border-gray-400 px-2 py-1">XYZ</td>
              <td className="border border-gray-400 px-2 py-1 text-center">500</td>
              <td className="border border-gray-400 px-2 py-1 text-center">450</td>
              <td className="border border-gray-400 px-2 py-1 text-center">2</td>
              <td className="border border-gray-400 px-2 py-1 text-center">10%</td>
              <td className="border border-gray-400 px-2 py-1 text-center">18%</td>
              <td className="border border-gray-400 px-2 py-1 text-center">1000.05</td>
            </tr>
            <tr>
              <td className="border border-gray-400 px-2 py-1 text-center">1</td>
              <td className="border border-gray-400 px-2 py-1">XYZ</td>
              <td className="border border-gray-400 px-2 py-1 text-center">500</td>
              <td className="border border-gray-400 px-2 py-1 text-center">450</td>
              <td className="border border-gray-400 px-2 py-1 text-center">2</td>
              <td className="border border-gray-400 px-2 py-1 text-center">10%</td>
              <td className="border border-gray-400 px-2 py-1 text-center">18%</td>
              <td className="border border-gray-400 px-2 py-1 text-center">1000.05</td>
            </tr>
            <tr>
              <td className="border border-gray-400 px-2 py-1 text-center">1</td>
              <td className="border border-gray-400 px-2 py-1">XYZ</td>
              <td className="border border-gray-400 px-2 py-1 text-center">500</td>
              <td className="border border-gray-400 px-2 py-1 text-center">450</td>
              <td className="border border-gray-400 px-2 py-1 text-center">2</td>
              <td className="border border-gray-400 px-2 py-1 text-center">10%</td>
              <td className="border border-gray-400 px-2 py-1 text-center">18%</td>
              <td className="border border-gray-400 px-2 py-1 text-center">1000.05</td>
            </tr>
            <tr>
              <td className="border border-gray-400 px-2 py-1 text-center">1</td>
              <td className="border border-gray-400 px-2 py-1">XYZ</td>
              <td className="border border-gray-400 px-2 py-1 text-center">500</td>
              <td className="border border-gray-400 px-2 py-1 text-center">450</td>
              <td className="border border-gray-400 px-2 py-1 text-center">2</td>
              <td className="border border-gray-400 px-2 py-1 text-center">10%</td>
              <td className="border border-gray-400 px-2 py-1 text-center">18%</td>
              <td className="border border-gray-400 px-2 py-1 text-center">1000.05</td>
            </tr>
            <tr>
              <td className="border border-gray-400 px-2 py-1 text-center">1</td>
              <td className="border border-gray-400 px-2 py-1">XYZ</td>
              <td className="border border-gray-400 px-2 py-1 text-center">500</td>
              <td className="border border-gray-400 px-2 py-1 text-center">450</td>
              <td className="border border-gray-400 px-2 py-1 text-center">2</td>
              <td className="border border-gray-400 px-2 py-1 text-center">10%</td>
              <td className="border border-gray-400 px-2 py-1 text-center">18%</td>
              <td className="border border-gray-400 px-2 py-1 text-center">1000.05</td>
            </tr>
            <tr>
              <td className="border border-gray-400 px-2 py-1 text-center">1</td>
              <td className="border border-gray-400 px-2 py-1">XYZ</td>
              <td className="border border-gray-400 px-2 py-1 text-center">500</td>
              <td className="border border-gray-400 px-2 py-1 text-center">450</td>
              <td className="border border-gray-400 px-2 py-1 text-center">2</td>
              <td className="border border-gray-400 px-2 py-1 text-center">10%</td>
              <td className="border border-gray-400 px-2 py-1 text-center">18%</td>
              <td className="border border-gray-400 px-2 py-1 text-center">1000.05</td>
            </tr>
            <tr>
              <td className="border border-gray-400 px-2 py-1 text-center">1</td>
              <td className="border border-gray-400 px-2 py-1">XYZ</td>
              <td className="border border-gray-400 px-2 py-1 text-center">500</td>
              <td className="border border-gray-400 px-2 py-1 text-center">450</td>
              <td className="border border-gray-400 px-2 py-1 text-center">2</td>
              <td className="border border-gray-400 px-2 py-1 text-center">10%</td>
              <td className="border border-gray-400 px-2 py-1 text-center">18%</td>
              <td className="border border-gray-400 px-2 py-1 text-center">1000.05</td>
            </tr>
            <tr>
              <td className="border border-gray-400 px-2 py-1 text-center">1</td>
              <td className="border border-gray-400 px-2 py-1">XYZ</td>
              <td className="border border-gray-400 px-2 py-1 text-center">500</td>
              <td className="border border-gray-400 px-2 py-1 text-center">450</td>
              <td className="border border-gray-400 px-2 py-1 text-center">2</td>
              <td className="border border-gray-400 px-2 py-1 text-center">10%</td>
              <td className="border border-gray-400 px-2 py-1 text-center">18%</td>
              <td className="border border-gray-400 px-2 py-1 text-center">1000.05</td>
            </tr>
            <tr>
              <td className="border border-gray-400 px-2 py-1 text-center">1</td>
              <td className="border border-gray-400 px-2 py-1">XYZ</td>
              <td className="border border-gray-400 px-2 py-1 text-center">500</td>
              <td className="border border-gray-400 px-2 py-1 text-center">450</td>
              <td className="border border-gray-400 px-2 py-1 text-center">2</td>
              <td className="border border-gray-400 px-2 py-1 text-center">10%</td>
              <td className="border border-gray-400 px-2 py-1 text-center">18%</td>
              <td className="border border-gray-400 px-2 py-1 text-center">1000.05</td>
            </tr>
            <tr>
              <td className="border border-gray-400 px-2 py-1 text-center">1</td>
              <td className="border border-gray-400 px-2 py-1">XYZ</td>
              <td className="border border-gray-400 px-2 py-1 text-center">500</td>
              <td className="border border-gray-400 px-2 py-1 text-center">450</td>
              <td className="border border-gray-400 px-2 py-1 text-center">2</td>
              <td className="border border-gray-400 px-2 py-1 text-center">10%</td>
              <td className="border border-gray-400 px-2 py-1 text-center">18%</td>
              <td className="border border-gray-400 px-2 py-1 text-center">1000.05</td>
            </tr>
          </tbody>
        </table>
      </section>

      <hr className="my-4 border-gray-400" />

      {/* Grand Total */}
      <section className="text-right text-sm">
        <p className="font-bold text-blue-600">
          GRAND TOTAL: <FaRupeeSign className="inline" /> 1000.05/-
        </p>
        <p className="text-gray-600">
          Whether tax is payable under reverse charges - No
        </p>
      </section>

      <hr className="my-4 border-gray-400" />

      {/* Payment Info */}
      <section>
        <h2 className="font-bold text-sm text-blue-600">PAYMENT INFO</h2>
        <p className='text-sm'>Mode: UPI</p>
        <p className='text-sm'>Payment Id - phonePay-123456789012</p>
      </section>

      <hr className="my-4 border-gray-400" />

      {/* Note */}
      <section className='text-sm'>
        <h2 className="font-bold text-blue-600">NOTE</h2>
        <p className="text-gray-800 text-xs">
          Please note that this is not a demand for payment.
        </p>
        <p className="text-gray-800 text-xs">
          This is a system generated invoice.
        </p>
      </section>

      {/* Authorized Sign */}
      <section className="text-right mt-4">
        <div className="inline-block">
          {/* Signature Image */}
          <img
            className="w-24 h-auto mx-auto"
            src="https://repository-images.githubusercontent.com/8805592/85279ffa-7f4a-4880-8e41-59e8032b0f71"
            alt="Authorized Sign"
          />
          <hr className='bg-black h-[2px]' />
          <p className="italic mt-0 text-center">Authorized Sign</p>
        </div>

        <div className="bottom w-80 flex justify-center h-1 text-xs border-gray-400 mx-auto mt-2">--------------- End of INVOICE --------------- </div>

      </section>
    </div>
  )
}

export default InvoiceTemplate