import java.lang.IllegalArgumentException;
import java.util.NoSuchElementException;
import java.util.Iterator;
import java.lang.UnsupportedOperationException;

public class Deque<Item> implements Iterable<Item> 
{
	private Item[] container;
	private int itemsCount;
	private int head;
	private int tail;

	public Deque()
	{                           // construct an empty deque
		container = (Item[])(new Object[1]);
		head = tail = 0;
		itemsCount = 0;
	}

	public boolean isEmpty()
	{
		return itemsCount == 0;
	}	// is the deque empty?
	
	public int size()
	{
		return itemsCount;
	}	// return the number of items on the deque
	
	public void addFirst(Item item)
	{
		if (item == null)
		{
			throw new IllegalArgumentException();
		}
	
		if (head == -1)
		{
			resize(container.length * 2);
		}
		
		container[head] = item;
		head--;

		itemsCount++;
	}// add the item to the front
	
	public void addLast(Item item)
	{
		if (item == null)
		{
			throw new IllegalArgumentException();
		}
	
		if (tail == container.length)
		{
			resize(container.length * 2);
		}
		
		container[tail] = item;
		tail++;
		
		itemsCount++;
	}	// add the item to the end
	
	public Item removeFirst() 
	{
		if (isEmpty())
		{
			throw new NoSuchElementException();
		}
		
		head++;
		
		Item item = container[head];
		container[head] = null;
		
		itemsCount--;
		if (!isEmpty() && container.length / itemsCount < 0.25)
		{
			resize(container.length / 2);
		}
		
		return item;
	}	// remove and return the item from the front
	
	public Item removeLast()
	{
		if (isEmpty())
		{
			throw new NoSuchElementException();
		}
				
		tail--;
		
		Item item = container[tail];
		container[tail] = null;
		
		itemsCount--;
		if (!isEmpty() && itemsCount <= container.length / 4)
		{
			resize(container.length / 2);
		}
		
		return item;
	}	// remove and return the item from the end
	
	public Iterator<Item> iterator()
	{
		return new DequeIterator();
	}	// return an iterator over items in order from front to end
	
	private class DequeIterator implements Iterator<Item>
	{
		private int current = head + 1;
		
		public boolean hasNext() { return current < tail; }
		
		public void remove() 
		{
			throw new UnsupportedOperationException();
		}
		
		public Item next()
		{
			if (hasNext())
			{	
				Item item = container[current];
				current++;
				
				return item;
			}
			else 
			{
				throw new NoSuchElementException(); 
			}
		}
	}
	
	private void resize(int length)
	{
		if (length < itemsCount)
		{
			throw new IllegalArgumentException();
		}
		
		Item[] newContainer = (Item[])(new Object[length]);
		int newHead = ((length - itemsCount) / 2) - 1;
		int newTail = newHead + 1;
		
		while (head < tail)
		{
			head++;
			newContainer[newTail] = container[head];
			newTail++;
		}
		
		container = newContainer;
		head = newHead;
		tail = newTail;
	}
	
	public static void main(String[] args)
	{
		Deque<String> deck = new Deque<String>();
		Iterator<String> iter = deck.iterator();
		
		deck.addFirst("one");
		deck.addLast("two");
		deck.addLast("three");
		deck.addFirst("four");
		
		while (iter.hasNext()){
			System.out.println(iter.next());
		}
	}	// unit testing (optional)
}